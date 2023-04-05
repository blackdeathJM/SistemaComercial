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
import {IActRoles, IRoles, TCrearRol} from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {RolesStore} from '@s-core/auth/store/roles.store';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';

@Injectable({providedIn: 'root'})
export class RolesService
{
    constructor(private crearRolesGQL: CrearRolesGQL, private rolesAsigGQL: RolesAsigGQL, private ngxUiLoaderService: NgxUiLoaderService, private rolesStore: RolesStore,
                private actPrimerNivelGQL: ActPrimerNivelGQL, private actSegundoNivelGQL: ActSegundoNivelGQL, private actTercerNivelGQL: ActTercerNivelGQL, private actCtrlPrimerNivelGQL: ActCtrlPrimerNivelGQL,
                private actCtrlSegundoNivelGQL: ActCtrlSegundoNivelGQL, private actCtrlTercerNivelGQL: ActCtrlTercerNivelGQL, private asigPermisoPrimerNivelGQL: AsigPermisoPrimerNivelGQL,
                private asigPermisoSegNivelGQL: AsigPermisoSegNivelGQL, private asigPermisoTercerNivelGQL: AsigPermisoTercerNivelGQL)
    {
    }

    crearRoles(args: TCrearRol): Observable<SingleExecutionResult<CrearRolesMutation>>
    {
        return this.crearRolesGQL.mutate({args}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const nvoEstado = res.data.crearRoles as IRoles;
                // this.stateRoles.setState(nvoEstado);
                this.rolesStore.update(nvoEstado);
            }
        }));
    }

    rolesAsig(idEmpleado: string, ngxLoader: string): Observable<SingleExecutionResult<RolesAsigQuery>>
    {
        this.ngxUiLoaderService.startLoader(ngxLoader);
        return this.rolesAsigGQL.fetch({idEmpleado}).pipe(finalize(() => this.ngxUiLoaderService.stopLoader(ngxLoader)), tap((res) =>
        {
            const rolesEmpleado = res.data.rolesAsig as IRoles;
            // this.stateRoles.setState(rolesEmpleado);
            this.rolesStore.update(rolesEmpleado);
        }));
    }

    actPrimerNivel(role: IActRoles): Observable<SingleExecutionResult<ActPrimerNivelMutation>>
    {
        return this.actPrimerNivelGQL.mutate({role}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const roles = res.data.actPrimerNivel as IRoles;
                // this.stateRoles.setState(roles);
                this.rolesStore.update(roles);
            }
        }));
    }

    actCtrlPrimerNivel(ctrl: IActRoles): Observable<SingleExecutionResult<ActCtrlPrimerNivelMutation>>
    {
        return this.actCtrlPrimerNivelGQL.mutate({ctrl}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const ctrls = res.data.actCtrlPrimerNivel as IRoles;
                // this.stateRoles.setState(ctrls);
                this.rolesStore.update(ctrls);
            }
        }));
    }

    actSegundoNivel(role: IActRoles): Observable<SingleExecutionResult<ActSegundoNivelMutation>>
    {
        return this.actSegundoNivelGQL.mutate({role}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const roles = res.data.actSegundoNivel as IRoles;
                // this.stateRoles.setState(roles);
                this.rolesStore.update(roles);
            }
        }));
    }

    actCtrlSegundoNivel(ctrl: IActRoles): Observable<SingleExecutionResult<ActCtrlSegundoNivelMutation>>
    {
        return this.actCtrlSegundoNivelGQL.mutate({ctrl}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const ctrls = res.data.actCtrlSegundoNivel as IRoles;
                // this.stateRoles.setState(ctrls);
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
                // this.stateRoles.setState(roles);
                this.rolesStore.update(roles);
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
                // this.stateRoles.setState(ctrls);
                this.rolesStore.update(ctrls);
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
                // this.stateRoles.setState(asignacion);
                this.rolesStore.update(asignacion);
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
                // this.stateRoles.setState(asignacion);
                this.rolesStore.update(asignacion);
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
                // this.stateRoles.setState(asignacion);
                this.rolesStore.update(asignacion);
            }
        }));
    }
}
