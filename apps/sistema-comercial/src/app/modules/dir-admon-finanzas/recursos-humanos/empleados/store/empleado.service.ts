import {Injectable} from '@angular/core';
import {EmpleadosGQL} from '#/libs/datos/src';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';

@Injectable({providedIn: 'root'})
export class EmpleadoService
{
    constructor(private empleadosGQL: EmpleadosGQL, private entityEmpleado: EntityEmpleadoStore)
    {
    }

    empleados(): Observable<SingleExecutionResult>
    {
        return this.empleadosGQL.watch().valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const empleados = $cast<IResolveEmpleado[]>(res.data.empleados);
                this.entityEmpleado.setAll(empleados);
            }
        }));
    }
}
