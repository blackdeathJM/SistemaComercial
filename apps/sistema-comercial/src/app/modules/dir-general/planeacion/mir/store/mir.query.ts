import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {IMirState, MirStore} from '@s-dir-general/mir/store/mir.store';
import {IMir} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface';

@Injectable({providedIn: 'root'})
export class MirQuery extends QueryEntity<IMirState, IMir>
{
    constructor(protected mirStore: MirStore)
    {
        super(mirStore);
    }
}
