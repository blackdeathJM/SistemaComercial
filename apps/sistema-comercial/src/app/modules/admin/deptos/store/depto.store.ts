import {EntityState, StoreConfig, EntityStore} from '@datorama/akita';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {Injectable} from '@angular/core';

// export type DeptoState = EntityState<IDepto, string>;
export interface DeptoState extends EntityState<IDepto, string>
{
    ui: {
        nombre: string;
    };
}

const initialState: DeptoState =
    {
        ui:
            {
                nombre: ''
            }
    };

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'deptos', idKey: '_id'})
export class DeptoStore extends EntityStore<DeptoState, IDepto>
{
    constructor()
    {
        super(initialState);
    }
}
