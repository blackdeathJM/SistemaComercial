import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {IMir} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface';
import {Injectable} from '@angular/core';

export interface IMirState extends EntityState<IMir, string>, ActiveState
{

}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'Mir', idKey: '_id'})
export class MirStore extends EntityStore<IMirState, IMir>
{
    constructor()
    {
        super();
    }
}
