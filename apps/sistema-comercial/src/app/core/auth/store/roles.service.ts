import {Injectable} from '@angular/core';
import {
    ActCtrlPrimerNivelGQL,
    ActCtrlPrimerNivelMutation, ActCtrlSegundoNivelGQL, ActCtrlSegundoNivelMutation, ActCtrlTercerNivelGQL, ActCtrlTercerNivelMutation,
    ActPrimerNivelGQL,
    ActPrimerNivelMutation,
    ActSegundoNivelGQL,
    ActSegundoNivelMutation,
    ActTercerNivelGQL,
    ActTercerNivelMutation, AsigPermisoPrimerNivelGQL, AsigPermisoPrimerNivelMutation, AsigPermisoSegNivelGQL, AsigPermisoSegNivelMutation, AsigPermisoTercerNivelGQL, AsigPermisoTercerNivelMutation,
    CrearRolesGQL,
    CrearRolesMutation,
    RolesAsigGQL,
    RolesAsigQuery
} from '#/libs/datos/src';
import {SingleExecutionResult} from '@apollo/client';
import {finalize, Observable, tap} from 'rxjs';
import {StateRoles} from '@s-core/auth/store/roles.entity';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {IActRoles, IRoles, TCrearRol} from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Injectable({providedIn: 'root'})
export class RolesService
{
    constructor(private crearRolesGQL: CrearRolesGQL, private rolesAsigGQL: RolesAsigGQL, private stateRoles: StateRoles, private ngxUiLoaderService: NgxUiLoaderService,
                private actPrimerNivelGQL: ActPrimerNivelGQL, private actSegundoNivelGQL: ActSegundoNivelGQL, private actTercerNivelGQL: ActTercerNivelGQL, private actCtrlPrimerNivelGQL: ActCtrlPrimerNivelGQL,
                private actCtrlSegundoNivelGQL: ActCtrlSegundoNivelGQL, private actCtrlTercerNivelGQL: ActCtrlTercerNivelGQL, private asigPermisoPrimerNivelGQL: AsigPermisoPrimerNivelGQL,
                private asigPermisoSegNivelGQL: AsigPermisoSegNivelGQL, private asigPermisoTercerNivelGQL: AsigPermisoTercerNivelGQL)
    {
    }

    crearRoles(args: TCrearRol): Observable<SingleExecutionResult<CrearRolesMutation>>
    {
        return this.crearRolesGQL.mutate({args}).pipe(tap((res) =>
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
            const rolesEmpleado = $cast<IRoles>(res.data.rolesAsig);
            this.stateRoles.setState(rolesEmpleado);
        }));
    }

    actPrimerNivel(role: IActRoles): Observable<SingleExecutionResult<ActPrimerNivelMutation>>
    {
        return this.actPrimerNivelGQL.mutate({role}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const roles = $cast<IRoles>(res.data.actPrimerNivel);
                this.stateRoles.setState(roles);
            }
        }));
    }

    actCtrlPrimerNivel(ctrl: IActRoles): Observable<SingleExecutionResult<ActCtrlPrimerNivelMutation>>
    {
        return this.actCtrlPrimerNivelGQL.mutate({ctrl}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const ctrls = $cast<IRoles>(res.data.actCtrlPrimerNivel);
                this.stateRoles.setState(ctrls);
            }
        }));
    }

    actSegundoNivel(role: IActRoles): Observable<SingleExecutionResult<ActSegundoNivelMutation>>
    {
        return this.actSegundoNivelGQL.mutate({role}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const roles = $cast<IRoles>(res.data.actSegundoNivel);
                this.stateRoles.setState(roles);
            }
        }));
    }

    actCtrlSegundoNivel(ctrl: IActRoles): Observable<SingleExecutionResult<ActCtrlSegundoNivelMutation>>
    {
        return this.actCtrlSegundoNivelGQL.mutate({ctrl}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const ctrls = $cast<IRoles>(res.data.actCtrlSegundoNivel);
                this.stateRoles.setState(ctrls);
            }
        }));
    }

    actTercerNivel(role: IActRoles): Observable<SingleExecutionResult<ActTercerNivelMutation>>
    {
        return this.actTercerNivelGQL.mutate({role}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const roles = $cast<IRoles>(res.data.actTercerNivel);
                this.stateRoles.setState(roles);
            }
        }));
    }

    actCtrlTercerNivel(ctrl: IActRoles): Observable<SingleExecutionResult<ActCtrlTercerNivelMutation>>
    {
        return this.actCtrlTercerNivelGQL.mutate({ctrl}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const ctrls = $cast<IRoles>(res.data.actCtrlTercerNivel);
                this.stateRoles.setState(ctrls);
            }
        }));
    }

    asiPermisoPrimerNivel(asig: IActRoles): Observable<SingleExecutionResult<AsigPermisoPrimerNivelMutation>>
    {
        return this.asigPermisoPrimerNivelGQL.mutate({asig}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const asignacion = $cast<IRoles>(res.data.asigPermisoPrimerNivel);
                this.stateRoles.setState(asignacion);
            }
        }));
    }

    asiPermisoSegundoNivel(asig: IActRoles): Observable<SingleExecutionResult<AsigPermisoSegNivelMutation>>
    {
        return this.asigPermisoSegNivelGQL.mutate({asig}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const asignacion = $cast<IRoles>(res.data.asigPermisoSegNivel);
                this.stateRoles.setState(asignacion);
            }
        }));
    }

    asiPermisoTercerNivel(asig: IActRoles): Observable<SingleExecutionResult<AsigPermisoTercerNivelMutation>>
    {
        return this.asigPermisoTercerNivelGQL.mutate({asig}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const asignacion = $cast<IRoles>(res.data.asigPermisoTercerNivel);
                this.stateRoles.setState(asignacion);
            }
        }));
    }
}
