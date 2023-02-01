import {Injectable} from '@angular/core';
import {CrearRolesGQL, CrearRolesMutation, RolesAsigGQL, RolesAsigQuery} from '#/libs/datos/src';
import {SingleExecutionResult} from '@apollo/client';
import {finalize, Observable, tap} from 'rxjs';
import {StateRoles} from '@s-core/auth/store/roles.store';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {IRoles} from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';
import {NgxToastService} from '@s-services/ngx-toast.service';

@Injectable({providedIn: 'root'})
export class RolesService
{
    constructor(private crearRolesGQL: CrearRolesGQL, private rolesAsigGQL: RolesAsigGQL, private stateRoles: StateRoles, private ngxToast: NgxToastService)
    {
    }

    crearRoles(idEmpleado: string, roles: object[]): Observable<SingleExecutionResult<CrearRolesMutation>>
    {
        return this.crearRolesGQL.mutate({args: {idEmpleado, roles}}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const nvoEstado = $cast<IRoles>(res.data.crearRoles);
                this.stateRoles.setState(nvoEstado);
            }
        }));
    }

    rolesAsig(idEmpleado: string): Observable<SingleExecutionResult<RolesAsigQuery>>
    {
        return this.rolesAsigGQL.fetch({idEmpleado}).pipe(finalize(() => console.log('finaliza correctamente')), tap((res) =>
        {
            if (res.data)
            {
                const rolesEmpleado = $cast<IRoles>(res.data.rolesAsig);
                this.stateRoles.setState(rolesEmpleado);
            }
        }));
    }
}
