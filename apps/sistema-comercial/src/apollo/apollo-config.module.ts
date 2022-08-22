import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {onError} from '@apollo/client/link/error';
import {ApolloLink, InMemoryCache, split} from '@apollo/client/core';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {createUploadLink} from 'apollo-upload-client';
import {environment} from '@s-environments/environment';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {concat, isArray} from 'lodash-es';


@NgModule({
    imports: [HttpClientModule, ApolloModule]
})
export class ApolloConfigModule
{
    constructor(apollo: Apollo, private ngxToast: ToastrService)
    {
        // Para capturar los errores de consulta y/o de red
        const errorLink = onError(({graphQLErrors, networkError, response}) =>
        {
            if (graphQLErrors)
            {
                console.log('response', response, graphQLErrors);
                const arreglo = response.errors[0]['extensions']['response']['message'];
                const arreglo2 = isArray(arreglo) ? arreglo : concat(arreglo);

                arreglo2.map((res) =>
                {
                    this.ngxToast.error(res, 'Error en el servidor',
                        {progressBar: true, closeButton: true, progressAnimation: 'increasing', timeOut: 20000});
                });
            }

            if (networkError)
            {
                Swal.fire('Error de conexion', networkError.message, 'error').then();
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
            defaultOptions: {
                watchQuery:
                    {
                        notifyOnNetworkStatusChange: true,
                        fetchPolicy: 'cache-and-network',
                    },
            },

            cache: new InMemoryCache(),
            connectToDevTools: true
        });
    }
}
