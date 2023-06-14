import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';

// TODO: Replace this with your own data model type
export interface TablaComunItem
{
    name: string;
    id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TablaComunItem[] = [
    {id: 1, name: 'Hydrogen'},
    {id: 2, name: 'Helium'},
    {id: 3, name: 'Lithium'},
    {id: 4, name: 'Beryllium'},
    {id: 5, name: 'Boron'},
    {id: 6, name: 'Carbon'},
    {id: 7, name: 'Nitrogen'},
    {id: 8, name: 'Oxygen'},
    {id: 9, name: 'Fluorine'},
    {id: 10, name: 'Neon'},
    {id: 11, name: 'Sodium'},
    {id: 12, name: 'Magnesium'},
    {id: 13, name: 'Aluminum'},
    {id: 14, name: 'Silicon'},
    {id: 15, name: 'Phosphorus'},
    {id: 16, name: 'Sulfur'},
    {id: 17, name: 'Chlorine'},
    {id: 18, name: 'Argon'},
    {id: 19, name: 'Potassium'},
    {id: 20, name: 'Calcium'},
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
