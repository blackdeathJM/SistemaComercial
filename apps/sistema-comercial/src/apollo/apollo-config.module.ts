import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {onError} from '@apollo/client/link/error';
import {ApolloLink, InMemoryCache, split} from '@apollo/client/core';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import {environment} from '@s-environments/environment';



@NgModule({
    // imports: [HttpClientModule, ApolloConfigModule, HttpLinkModule]
    imports: [HttpClientModule, ApolloModule]
})
export class ApolloConfigModule
{
    constructor(apollo: Apollo)
    {
        // Para capturar los errores de consulta y/o de red
        const errorLink = onError(({graphQLErrors, networkError}) =>
        {
            if (graphQLErrors)
            {
                console.log('GraphQL Errors', graphQLErrors);
            }

            if (networkError)
            {
                console.log('Networkd Errors', networkError);
            }
        });

        const uri = environment.apiGraphql;
        const httpLink = createUploadLink({uri});

        const wsClient = new WebSocketLink({
            uri: environment.wsGraphql, options: {reconnect: true},
        });

        const http = ApolloLink.from([errorLink, httpLink]);

        const link = split(({query}) =>
            {
                const definition = getMainDefinition(query);
                return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
            },
            wsClient,
            http
        );

        apollo.create({
            link,
            cache: new InMemoryCache(),
        });
    }
}
