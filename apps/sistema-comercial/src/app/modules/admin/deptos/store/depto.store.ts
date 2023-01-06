import {EntityState, StoreConfig, EntityStore} from '@datorama/akita';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {Injectable} from '@angular/core';

export interface DeptoState extends EntityState<IDepto, string>
{
    deptoSelect: IDepto;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'deptos', idKey:'_id'})
export class DeptoStore extends EntityStore<DeptoState, IDepto>
{
    constructor()
    {
        super();
    }
}
