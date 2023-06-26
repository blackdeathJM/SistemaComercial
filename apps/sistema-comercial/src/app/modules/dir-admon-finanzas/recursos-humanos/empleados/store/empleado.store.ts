import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {Injectable} from '@angular/core';

export interface IEmpleadoState extends EntityState<IResolveEmpleado, string>, ActiveState
{
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'Empleados', idKey: '_id'})
export class EmpleadoStore extends EntityStore<IEmpleadoState, IResolveEmpleado>
{
    constructor()
    {
        super();
    }
}
