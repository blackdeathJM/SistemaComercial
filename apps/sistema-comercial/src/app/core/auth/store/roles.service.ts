import {Injectable} from '@angular/core';
import {CrearRolesGQL, CrearRolesMutation, RolesAsigGQL, RolesAsigQuery} from '#/libs/datos/src';
import {SingleExecutionResult} from '@apollo/client';
import {finalize, Observable, tap} from 'rxjs';
import {StateRoles} from '@s-core/auth/store/roles.store';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {IRoles} from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Injectable({providedIn: 'root'})
export class RolesService
{
    constructor(private crearRolesGQL: CrearRolesGQL, private rolesAsigGQL: RolesAsigGQL, private stateRoles: StateRoles, private ngxUiLoaderService: NgxUiLoaderService)
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

    rolesAsig(idEmpleado: string, ngxLoader: string): Observable<SingleExecutionResult<RolesAsigQuery>>
    {
        this.ngxUiLoaderService.startLoader(ngxLoader);
        return this.rolesAsigGQL.fetch({idEmpleado}).pipe(finalize(() => this.ngxUiLoaderService.stopLoader(ngxLoader)), tap((res) =>
        {
            if (res.data)
            {
                const rolesEmpleado = $cast<IRoles>(res.data.rolesAsig);
                this.stateRoles.setState(rolesEmpleado);
            }
        }));
    }
}
