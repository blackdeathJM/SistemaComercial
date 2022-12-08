import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {MongooseModule} from '@nestjs/mongoose';
import {PubSub} from 'graphql-subscriptions';
import {ConfigModule, ConfigService} from '@nestjs/config';
import config from '../config/config';
import {AdminModule} from './admin/admin.module';
import {GeneralModule} from './general/general.module';
import {SubirArchivoModule} from './upload/subirArchivo.module';
import {GraphQLUpload} from 'graphql-upload';
import {AppService} from '#api/apps/api/src/app/app.service';
import {ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core';
import {TecnicaOperativaModule} from '#api/apps/api/src/app/tecnica-operativa/tecnica-operativa.module';

@Module({
    imports:
        [
            ConfigModule.forRoot({
                envFilePath: ['.env'], load: [config], expandVariables: true, isGlobal: true
            }),
            GraphQLModule.forRoot<ApolloDriverConfig>({
                driver: ApolloDriver,
                installSubscriptionHandlers: true,
                resolvers:
                    {
                        Upload: GraphQLUpload
                    },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                subscriptions: {
                    'graphql-ws': true,
                    'subscriptions-transport-ws': true
                },
                autoSchemaFile: 'apps/api/schema.graphql',
                cors: {origin: '*'},
                buildSchemaOptions:
                    {
                        dateScalarMode: 'timestamp',
                    },
                playground: false,
                context: ({req}) => ({req}),
                plugins:
                    [
                        ApolloServerPluginLandingPageLocalDefault
                    ]
            }),
            // MongooseModule.forRoot('mongodb+srv://blackdeath:FernandaTeamo1017@simapas-api-k3zc5.mongodb.net/simapas-api?retryWrites=true&w=majority'),
            // MongooseModule.forRoot(environment.uriMongo),
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
            SubirArchivoModule,
            AdminModule,
            GeneralModule,
            TecnicaOperativaModule
        ],
    providers: [{provide: 'PUB_SUB', useValue: new PubSub()}, AppService],
    exports: [AppService]
})
export class AppModule
{
}
