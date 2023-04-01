import {QueryEntity} from '@datorama/akita';
import {DeptoStore, IDeptoState} from '@s-dirAdmonFinanzas/departamento/store/depto.store';
import {IDepto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DeptoQuery extends QueryEntity<IDeptoState, IDepto>
{
    constructor(protected deptoStore: DeptoStore)
    {
        super(deptoStore);
    }

    seleccionarUno(_id: string): IDepto
    {
        this.deptoStore.setActive(_id);
        return null;
    }
}
