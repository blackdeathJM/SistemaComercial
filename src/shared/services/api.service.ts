import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {DocumentNode} from 'graphql';
import {catchError, finalize, Observable, of} from 'rxjs';
import {NgxToastService} from '@shared/services/ngx-toast.service';
import {GRAPHQL_STATE} from '@apollo/graphql.state';
import {concat, isArray} from 'lodash-es';

@Injectable({
    providedIn: 'root'
})
export class ApiService
{
    errorGraphql: string[] = [];

    constructor(private apollo: Apollo, private ngxToastService: NgxToastService)
    {
    }

    query(query: DocumentNode, variables = {}, context = {}): Observable<any>
    {
        return this.apollo.watchQuery({
            query, variables, context, fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true
        }).valueChanges.pipe(catchError(err => of([err])));
    }

    consulta(query: DocumentNode, variables = {}, context = {}): Observable<any>
    {
        return this.apollo.query({
            query, variables, context, notifyOnNetworkStatusChange: true
        }).pipe(catchError(err => of([err])));
    }

    mutation(mutation: DocumentNode, variables = {}, context = {}, refetchQueries = []): Observable<any>
    {
        return this.apollo.mutate({
            mutation,
            variables,
            context,
            refetchQueries
        }).pipe(catchError(() =>
        {
            if (GRAPHQL_STATE())
            {
                if (isArray(GRAPHQL_STATE()))
                {
                    this.errorGraphql = GRAPHQL_STATE();
                } else
                {
                    this.errorGraphql = concat(GRAPHQL_STATE());
                }
                this.errorGraphql.map((res) =>
                {
                    this.ngxToastService.errorToast(res, 'Error del servidor',
                        {timeOut: 20000, progressAnimation: 'increasing', enableHtml: true, closeButton: true, progressBar: true});
                });
            }
            return of([]);
        }));
    }

    protected subscription(subscription: DocumentNode, variables = {}, context = {}, _pluck: string[] = []): Observable<any>
    {
        return this.apollo.subscribe({
            query: subscription,
            variables,
            context
        }).pipe(catchError(err => of([err])));
    }
}
