import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {DocumentNode} from 'graphql';
import {catchError, Observable, of, pluck} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService
{

    constructor(private apollo: Apollo)
    {
    }

    query(query: DocumentNode, variables = {}, context = {}, _pluck: string[]): Observable<any>
    {
        return this.apollo.watchQuery({
            query, variables, context, fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true
        }).valueChanges.pipe(catchError((err) =>
        {
            console.log('error en api service', err);
            return of([]);
        }));
    }

    consulta(query: DocumentNode, variables = {}, context = {}, _pluck: string[]): Observable<any>
    {
        return this.apollo.query({
            query, variables, context, notifyOnNetworkStatusChange: true
        }).pipe(pluck(..._pluck), catchError((err) =>
        {
            console.log('error en consulta', err);
            return of([]);
        }));
    }

    mutation(mutation: DocumentNode, variables = {}, context = {}, _pluck: string[] = [],
             refetchQueries = []): Observable<any>
    {
        return this.apollo.mutate({
            mutation,
            variables,
            context,
            refetchQueries
        }).pipe(pluck(..._pluck));
    }

    protected subscription(subscription: DocumentNode, variables = {}, context = {}, _pluck: string[] = []): Observable<any>
    {
        return this.apollo.subscribe({
            query: subscription,
            variables,
            context
        }).pipe(pluck(..._pluck));
    }
}
