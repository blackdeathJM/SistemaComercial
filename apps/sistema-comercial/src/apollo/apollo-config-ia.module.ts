import {Inject, NgModule} from '@angular/core';
import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {environment} from '@s-environments/environment';
import {WebSocketLink} from '@apollo/client/link/ws';
import {setContext} from '@apollo/client/link/context';
import {TOKEN} from '@s-auth/const';
import {onError} from '@apollo/client/link/error';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {createUploadLink} from 'apollo-upload-client';

@NgModule({
    providers:
        [
            {
                provide: APOLLO_OPTIONS,
                useFactory: (httpLink: HttpLink): ApolloClientOptions<any> =>
                {
                    const http = httpLink.create({
                        uri: environment.apiGraphql,
                    });

                    const ws = new WebSocketLink({
                        uri: environment.wsGraphql,
                        options: {
                            reconnect: true,
                            connectionParams: {
                                authorization: localStorage.getItem(TOKEN)
                            }
                        }
                    });
                    const auth = setContext((_, {headers}) =>
                    {
                        const token = localStorage.getItem(TOKEN);
                        return {
                            headers: {
                                ...headers,
                                autorization: token ? `Bearer ${token}` : '',
                            }
                        };
                    });
                    const errorLink = onError(({graphQLErrors, networkError}) =>
                    {
                        if (graphQLErrors)
                        {
                            graphQLErrors.map(({message, path}) =>
                            {
                                console.log('modulo apollo', message, location, path);
                            });
                        }
                        if (networkError)
                        {
                            console.log(`[Network error]: ${networkError}`);
                        }
                    });
                    const uploadLink = createUploadLink({
                        uri: environment.apiGraphql,
                    });
                    const link = ApolloLink.from([errorLink, auth, ws, uploadLink, http]);

                    const apollo = Inject(Apollo);

                    return {
                        link,
                        cache: new InMemoryCache()
                    };

                },
                deps: [HttpLink]
            }
        ]
})
export class ApolloConfigIaModule
{
}
