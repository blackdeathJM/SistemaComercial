import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {IDepto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface';
import {Injectable} from '@angular/core';

export interface IDeptoState extends EntityState<IDepto, string>, ActiveState
{
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'departamentos', idKey: '_id'})
export class DeptoStore extends EntityStore<IDeptoState, IDepto>
{
    constructor()
    {
        super();
    }
}
