import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {MongooseModule} from '@nestjs/mongoose';
import {PubSub} from 'graphql-subscriptions';
import {DeptosModule} from './deptos/deptos.module';
import {EmpleadoModule} from './empleado/empleado.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import config from '../config/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.dev'],
            load: [config],
            expandVariables: true,
            isGlobal: true,
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
            buildSchemaOptions: {dateScalarMode: 'isoDate'},
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
        DeptosModule,
        EmpleadoModule
    ],
    providers: [{provide: 'PUB_SUB', useValue: new PubSub()}],
})
export class AppModule
{
}
