import {QueryEntity} from '@datorama/akita';
import {DeptoState, DeptoStore} from '@s-dirAdmonFinanzas/departamento/store/depto.store';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class DeptoQuery extends QueryEntity<DeptoState, IDepto>
{
    deptoFiltrado$ = this.select(state => state.ui.nombre);
    constructor(protected deptoStore: DeptoStore)
    {
        super(deptoStore);
    }
}
