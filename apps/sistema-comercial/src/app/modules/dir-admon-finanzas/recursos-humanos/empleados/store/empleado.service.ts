import {Injectable} from '@angular/core';
import {
    ActualizarAvatarGQL, ActualizarContrasenaAdminGQL, CrearEmpleadoGQL, EmpleadosGQL, EmpleadosSesionGQL, FiltrarEmpleadosGQL,
    FiltrarEmpleadosQuery
} from '#/libs/datos/src';
import {catchError, finalize, Observable, tap} from 'rxjs';
import {makeVar, SingleExecutionResult} from '@apollo/client';
import {IResolveEmpleado, TRegEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {IModificado} from '#/libs/models/src/lib/common/common.interface';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {TOKEN} from '@s-auth/const';
import {ILoginRespuesta} from '#/libs/models/src/lib/admin/empleado/auth/login.dto';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AuthStore} from '@s-core/auth/store/auth.store';
import {EmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/empleado.store';
import {GeneralService} from "@s-services/general.service";

export const ngxLoaderEmp = makeVar<string>('ngxLoaderEmpleados');

@Injectable({providedIn: 'root'})
export class EmpleadoService
{

    constructor(private empleadosGQL: EmpleadosGQL, private actualizarContrasenaGQL: ActualizarContrasenaAdminGQL, private ngxToast: NgxToastService,
                private actualizarAvtarGQL: ActualizarAvatarGQL, private empleadosSesionGQL: EmpleadosSesionGQL, private crearEmpleadoGQL: CrearEmpleadoGQL,
                private filtrarEmpleadosGQL: FiltrarEmpleadosGQL, private ngxLoader: NgxUiLoaderService, private authStore: AuthStore, private empleadoStore: EmpleadoStore,
                private generalService: GeneralService)
    {
    }

    empleados(): Observable<SingleExecutionResult>
    {
        this.ngxLoader.startLoader(ngxLoaderEmp());
        return this.empleadosGQL.watch().valueChanges.pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res && res.data)
            {
                const empleados = res.data.empleados as IResolveEmpleado[];
                // this.entityEmpleado.setAll(empleados);
                this.empleadoStore.set(empleados);
            }
            this.ngxLoader.stopLoader(ngxLoaderEmp());
        }));
    }

    actualizarContrasena(_id: string, contrasena: string, modificadoPor: IModificado): Observable<SingleExecutionResult>
    {
        return this.actualizarContrasenaGQL.mutate({datos: {_id, contrasena}, modificadoPor}).pipe(catchError(err => this.generalService.cacharError(err)),
            tap((res) =>
            {
                if (res && res.data)
                {
                    this.ngxToast.satisfactorioToast('La contrasena se ha cambiado con exito', 'Cambio de contrasena');
                }
            }));
    }

    actualizarAvatar(_id: string, urlAvatar: string): Observable<SingleExecutionResult>
    {
        return this.actualizarAvtarGQL.mutate({_id, url: urlAvatar}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res && res.data)
            {
                const nvosDatos = res.data.actualizarAvatar as ILoginRespuesta;
                localStorage.setItem(TOKEN, nvosDatos.token);
                // this.authEntity.setState(nvosDatos.datosSesion);
                this.authStore.update(nvosDatos.datosSesion);
                this.ngxToast.satisfactorioToast('Tu avatar se ha cambiado con exito', 'Cambio de avatar');
            }
        }));
    }

    crearEmpleado(empleado: TRegEmpleado): Observable<SingleExecutionResult>
    {
        return this.crearEmpleadoGQL.mutate({empleadoDatos: empleado}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res.data)
            {
                const nvoEmpleado = res.data.crearEmpleado as IResolveEmpleado;
                // this.entityEmpleado.addOne(nvoEmpleado);
                this.empleadoStore.add(nvoEmpleado);
                this.ngxToast.satisfactorioToast('El empleado fue dado de alta con exito', 'Alta empleados');
            }
        }));
    }

    empleadosConSesion(): Observable<SingleExecutionResult>
    {
        return this.empleadosSesionGQL.fetch().pipe(
            catchError(err => this.generalService.cacharError(err)),
            tap((res) =>
            {
                if (res.data)
                {
                    const empleadosSesion = res.data.empleadosSesion as IResolveEmpleado[];
                    // this.entityEmpleado.setAll(empleadosSesion);
                    this.empleadoStore.set(empleadosSesion);
                }
            }));
    }

    filtrarEmpleados(consulta: string): Observable<SingleExecutionResult<FiltrarEmpleadosQuery>>
    {
        this.ngxLoader.startLoader(ngxLoaderEmp());
        return this.filtrarEmpleadosGQL.fetch({consulta}).pipe(
            catchError(err => this.generalService.cacharError(err)),
            finalize(() => this.ngxLoader.stopLoader(ngxLoaderEmp())),
            tap((res) =>
            {
                if (res.data)
                {
                    const filtroEmpleados = res.data.filtrarEmpleados as IResolveEmpleado[];
                    // this.entityEmpleado.setAll(filtroEmpleados);
                    this.empleadoStore.set(filtroEmpleados);
                }
            }));
    }
}
