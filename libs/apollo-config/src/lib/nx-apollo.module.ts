import {NgModule} from '@angular/core';
import {ApolloLink, InMemoryCache, split} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {Apollo, ApolloModule} from 'apollo-angular';
import {createUploadLink} from 'apollo-upload-client';
import {onError} from '@apollo/client/link/error';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    imports: [HttpClientModule, ApolloModule]
})
export class NxApolloModule
{
    constructor(apollo: Apollo)
    {
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        function httpToWs(path: string): string
        {
            return [
                // Replace 'http*' with 'ws*'
                location.protocol.replace('http', 'ws'),
                // Get the current hostname
                `//${location.hostname}`,
                // Get the current port
                `:${location.port}`,
                // Add the path
                path,
            ].join('');
        }

        console.log('apollo-config', httpToWs('/graphql'));
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

        const ws = new WebSocketLink({
            uri: httpToWs('/graphql'),
            options: {
                reconnect: true,
            },
        });
        const httpLink = createUploadLink({uri: httpToWs('/graphql')});

        const http = ApolloLink.from([errorLink, httpLink]);
        const link = split(
            ({query}) =>
            {
                const {kind, operation}: any = getMainDefinition(query);
                return kind === 'OperationDefinition' && operation === 'subscription';
            },
            ws,
            http,
        );

        apollo.create({link, cache: new InMemoryCache()});
    }
}
