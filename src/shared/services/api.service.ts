import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {DocumentNode} from 'graphql';
import {catchError, Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService
{

    constructor(private apollo: Apollo)
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
        }).pipe(catchError(err => of([err])));
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
