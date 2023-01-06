import {QueryEntity} from '@datorama/akita';
import {DeptoState, DeptoStore} from '@s-admin/store/depto.store';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';

export class DeptoQuery extends QueryEntity<DeptoState, IDepto>
{
    constructor(protected deptoStore: DeptoStore)
    {
        super(deptoStore);
    }
}
