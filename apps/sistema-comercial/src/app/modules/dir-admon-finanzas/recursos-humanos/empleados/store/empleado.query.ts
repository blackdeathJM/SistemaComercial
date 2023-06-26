import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {EmpleadoStore, IEmpleadoState} from '@s-dirAdmonFinanzas/empleados/store/empleado.store';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';

@Injectable({providedIn: 'root'})
export class EmpleadoQuery extends QueryEntity<IEmpleadoState, IResolveEmpleado>
{
    constructor(protected empleadoStore: EmpleadoStore)
    {
        super(empleadoStore);
    }

    filEmpleados(nombre: string): IResolveEmpleado[]
    {
        const entidad = this.getAll().slice();

        return entidad.filter(value => value.nombreCompleto.toLowerCase().includes(nombre.toLowerCase()));
    }
}
