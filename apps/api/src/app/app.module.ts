import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {MongooseModule} from '@nestjs/mongoose';
import {PubSub} from 'graphql-subscriptions';
import {ConfigModule, ConfigService} from '@nestjs/config';
import config from '../config/config';
import {AdminModule} from './admin/admin.module';
import {GeneralModule} from './general/general.module';
import {SubidaModule} from './upload/subida.module';
import {UploadScalar} from '@sistema-comercial/modelos/upload.scalar';
import {GraphQLUpload} from 'graphql-upload';


@Module({
    imports:
        [
            ConfigModule.forRoot({
                envFilePath: ['.env', '.env.dev'], load: [config], expandVariables: true, isGlobal: true,
            }),
            GraphQLModule.forRoot<ApolloDriverConfig>({
                driver: ApolloDriver,
                installSubscriptionHandlers: true,
                resolvers: {Upload: GraphQLUpload},
                // eslint-disable-next-line @typescript-eslint/naming-convention
                subscriptions: {
                    'graphql-ws': true,
                    'subscriptions-transport-ws': true,
                },
                autoSchemaFile: 'apps/api/schema.graphql',
                // cors: {
                //     origin: 'http://localhost:4200',
                //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                //     preflightContinue: true,
                //     optionsSuccessStatus: 204,
                // },
                cors: {origin: '*'},
                buildSchemaOptions: {dateScalarMode: 'timestamp'},
                introspection: true,
                context: ({req}) => ({req}),
            }),
            MongooseModule.forRootAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService) => (
                    {
                        uri: configService.get('database.uriMongo'),
                        useNewUrlParser: true
                    }
                )
            }),
            UploadScalar,
            SubidaModule,
            AdminModule,
            GeneralModule
        ],
    providers: [{provide: 'PUB_SUB', useValue: new PubSub()}]
})
export class AppModule
{
}
