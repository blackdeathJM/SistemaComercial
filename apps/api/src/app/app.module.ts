import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {MongooseModule} from '@nestjs/mongoose';
import {PubSub} from 'graphql-subscriptions';
import {ConfigModule, ConfigService} from '@nestjs/config';
import config from '../config/config';
import {AdminModule} from './admin/admin.module';
import {GeneralModule} from './general/general.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.dev'], load: [config], expandVariables: true, isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            subscriptions: {
                'graphql-ws': true,
                'subscriptions-transport-ws': true,
            },
            autoSchemaFile: 'apps/api/schema.graphql',
            cors: {origin: '*', credentials: false},
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
        AdminModule,
        GeneralModule
    ],
    providers: [{provide: 'PUB_SUB', useValue: new PubSub()}]
})
export class AppModule
{
}
