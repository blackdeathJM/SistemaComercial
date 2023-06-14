import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {map} from 'rxjs/operators';
import {merge, Observable, of as observableOf} from 'rxjs';

// TODO: Replace this with your own data model type
export interface TablaComunItem
{
    name: string;
    id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TablaComunItem[] = [
    {id: 1, name: 'Hydrogen'},
    {id: 2, name: 'Helium'}
];

/**
 * Data source for the TablaComun view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TablaComunDataSource extends DataSource<TablaComunItem>
{
    data: TablaComunItem[] = EXAMPLE_DATA;

    constructor()
    {
        super();
    }

    connect(): Observable<TablaComunItem[]>
    {
        return merge(observableOf(this.data).pipe(map(() =>
        {
            return [...this.data];
        })));
    }

    disconnect(collectionViewer: CollectionViewer): void
    {
    }
}
