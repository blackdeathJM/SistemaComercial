import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { DeptosModule } from './deptos/deptos.module';
import { DeptosService } from './deptos/deptos.service';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            subscriptions: {
                'graphql-ws': true,
                'subscriptions-transport-ws': true,
            },
            autoSchemaFile: 'schema.gql',
            cors: { origin: '*', credentials: false },
            introspection: true,
            path: '/graphql',
            debug: true,
            context: ({ req }) => ({ req }),
        }),
        MongooseModule.forRoot(
            'mongodb+srv://blackdeath:FernandaTeamo1017@simapas-api-k3zc5.mongodb.net/simapas-api?retryWrites=true&w=majority',
            { autoIndex: true, retryWrites: false }
        ),
        DeptosModule,
    ],
    providers: [{ provide: 'PUB_SUB', useValue: new PubSub() }, DeptosService],
})
export class AppModule {}
