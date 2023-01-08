import {Injectable} from '@angular/core';
import {ActualizarAvatarGQL, ActualizarContrasenaAdminGQL, CrearEmpleadoGQL, EmpleadosGQL, EmpleadosSesionGQL} from '#/libs/datos/src';
import {catchError, Observable, of, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {IResolveEmpleado, TRegEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {IModificado} from '#/libs/models/src/lib/common/common.interface';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {TOKEN} from '@s-auth/const';
import {ILoginRespuesta} from '#/libs/models/src/lib/admin/empleado/auth/login.dto';
import {StateAuth} from '@s-core/auth/store/auth.store';

@Injectable({providedIn: 'root'})
export class EmpleadoService
{
    constructor(private empleadosGQL: EmpleadosGQL, private entityEmpleado: EntityEmpleadoStore, private actualizarContrasenaGQL: ActualizarContrasenaAdminGQL, private ngxToast: NgxToastService,
                private actualizarAvtarGQL: ActualizarAvatarGQL, private stateAuth: StateAuth, private empleadosSesionGQL: EmpleadosSesionGQL, private crearEmpleadoGQL: CrearEmpleadoGQL)
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

    actualizarContrasena(_id: string, contrasena: string, modificadoPor: IModificado): Observable<SingleExecutionResult>
    {
        return this.actualizarContrasenaGQL.mutate({datos: {_id, contrasena}, modificadoPor}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                this.ngxToast.satisfactorioToast('La contrasena se ha cambiado con exito', 'Cambio de contrasena');
            }
        }));
    }

    actualizarAvatar(_id: string, urlAvatar: string): Observable<SingleExecutionResult>
    {
        return this.actualizarAvtarGQL.mutate({_id, url: urlAvatar}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const nvosDatos = $cast<ILoginRespuesta>(res.data.actualizarAvatar);
                localStorage.setItem(TOKEN, nvosDatos.token);
                this.stateAuth.setState(nvosDatos.datosSesion);
                this.ngxToast.satisfactorioToast('Tu avatar se ha cambiado con exito', 'Cambio de avatar');
            }
        }), catchError(() =>
        {
            this.ngxToast.errorToast('Ocurrio un error al tratar de gardar el avatar', 'Error en el servidor');
            return of(null);
        }));
    }

    crearEmpleado(empleado: TRegEmpleado): Observable<SingleExecutionResult>
    {
        return this.crearEmpleadoGQL.mutate({empleadoDatos: empleado}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const nvoEmpleado = $cast<IResolveEmpleado>(res.data.crearEmpleado);
                this.entityEmpleado.addOne(nvoEmpleado);
                this.ngxToast.satisfactorioToast('El empleado fue dado de alta con exito', 'Alta empleados');
            }
        }), catchError(() =>
        {
            this.ngxToast.errorToast('Ocurrio un error al tratar de dar de alta el registro', 'Alta de empleados');
            return of(null);
        }));
    }

    empleadosConSesion(): Observable<SingleExecutionResult>
    {
        return this.empleadosSesionGQL.watch().valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const empleadosSesion = $cast<IResolveEmpleado>(res.data.empleadosSesion);
                this.stateAuth.setState(empleadosSesion);
            }
        }));
    }
}
