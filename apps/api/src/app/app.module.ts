import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {MongooseModule} from '@nestjs/mongoose';
import {PubSub} from 'graphql-subscriptions';
import {ConfigModule, ConfigService} from '@nestjs/config';
import config from '../config/config';
import {AdminModule} from './admin/admin.module';
import {GeneralModule} from './general/general.module';
import {SubirArchivoModule} from './upload/subirArchivo.module';
import {GraphQLUpload} from 'graphql-upload-ts';
import {AppService} from '#api/apps/api/src/app/app.service';
import {TecnicaOperativaModule} from '#api/apps/api/src/app/tecnica-operativa/tecnica-operativa.module';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {DirAdmonFinanzasModule} from '#api/apps/api/src/app/dir-admon-finanzas/dir-admon-finanzas.module';
import {DirGeneralModule} from '#api/apps/api/src/app/dir-general/dir-general.module';

@Module({
    imports:
        [
            ConfigModule.forRoot({
                envFilePath: ['.env'], load: [config], expandVariables: true, isGlobal: true
            }),
            GraphQLModule.forRoot<ApolloDriverConfig>({
                driver: ApolloDriver,
                installSubscriptionHandlers: true,
                subscriptions: {
                    'graphql-ws': true
                },
                resolvers:
                    {
                        Upload: GraphQLUpload
                    },
                autoSchemaFile: 'apps/api/schema.graphql',
                buildSchemaOptions:
                    {
                        dateScalarMode: 'isoDate',
                    },
                playground: false,
                context: ({req}) => ({req}),
            }),
            MongooseModule.forRootAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService) => (
                    {
                        uri: configService.get('URI_MONGO'),
                        useNewUrlParser: true
                    }
                )
            }),
            DirGeneralModule,
            SubirArchivoModule,
            AdminModule,
            DirAdmonFinanzasModule,
            GeneralModule,
            TecnicaOperativaModule
        ],
    providers: [{provide: 'PUB_SUB', useValue: new PubSub()}, AppService],
    exports: [AppService]
})
export class AppModule
{
}
