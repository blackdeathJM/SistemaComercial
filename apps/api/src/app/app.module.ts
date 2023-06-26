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
import {APP_FILTER} from '@nestjs/core';
import {ExcepcionesMongoose} from '#api/apps/api/src/exceptions/excepciones';
import * as process from "process";

@Module({
    imports:
        [
            ConfigModule.forRoot({
                envFilePath: `${process.env.NODE_ENV}.env`, load: [config], expandVariables: true, isGlobal: true
            }),
            GraphQLModule.forRoot<ApolloDriverConfig>({
                driver: ApolloDriver,
                installSubscriptionHandlers: true,
                subscriptions: {
                    'graphql-ws': true,
                    'subscriptions-transport-ws': true
                },
                resolvers:
                    {
                        Upload: GraphQLUpload
                    },
                autoSchemaFile: 'apps/api/schema.graphql',
                buildSchemaOptions:
                    {
                        dateScalarMode: 'isoDate'
                    },
                playground: false,
                context: ({req}) => ({req}),
                formatError: error =>
                {
                    return {
                        message: error.message,
                        path: error.path,
                        locations: error.locations,
                        extensions: error.extensions
                    };
                },
                autoTransformHttpErrors: true
            }),
            MongooseModule.forRootAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService) => (
                    {
                        uri: configService.get('config.uriMongo'),
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
    providers: [{provide: 'PUB_SUB', useValue: new PubSub()}, AppService, {provide: APP_FILTER, useClass: ExcepcionesMongoose}],
    exports: [AppService]
})
export class AppModule
{
}
