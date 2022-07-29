import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {onError} from '@apollo/client/link/error';
import {ApolloLink, InMemoryCache, split} from '@apollo/client/core';
import {WebSocketLink} from '@apollo/client/link/ws';
import {environment} from '@environments/environment';
import {getMainDefinition} from '@apollo/client/utilities';
import {createUploadLink} from 'apollo-upload-client';
import {GRAPHQL_STATE} from '@apollo/graphql.state';
import Swal from 'sweetalert2';

@NgModule({
    // imports: [HttpClientModule, ApolloModule, HttpLinkModule]
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
                for (const i of graphQLErrors)
                {
                    GRAPHQL_STATE(i.extensions.response['message']);
                }
            }


            if (networkError)
            {
                Swal.fire('Error de red', networkError.message, 'error').then();
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
