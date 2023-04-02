import {Injectable} from '@angular/core';
import {
    ActualizarAvatarGQL, ActualizarContrasenaAdminGQL, CrearEmpleadoGQL, EmpleadosGQL, EmpleadosSesionGQL, FiltrarEmpleadosGQL,
    FiltrarEmpleadosQuery
} from '#/libs/datos/src';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {EmpleadoEntity} from '@s-dirAdmonFinanzas/empleados/store/empleado.entity';
import {IResolveEmpleado, TRegEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {IModificado} from '#/libs/models/src/lib/common/common.interface';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {TOKEN} from '@s-auth/const';
import {ILoginRespuesta} from '#/libs/models/src/lib/admin/empleado/auth/login.dto';
import {AuthEntity} from '@s-core/auth/store/auth.entity';
import {NgxUiLoaderService} from 'ngx-ui-loader';

export const ngxLoaderEmp = 'loaderEmpleados';

@Injectable({providedIn: 'root'})
export class EmpleadoService
{

    constructor(private empleadosGQL: EmpleadosGQL, private entityEmpleado: EmpleadoEntity, private actualizarContrasenaGQL: ActualizarContrasenaAdminGQL, private ngxToast: NgxToastService,
                private actualizarAvtarGQL: ActualizarAvatarGQL, private authEntity: AuthEntity, private empleadosSesionGQL: EmpleadosSesionGQL, private crearEmpleadoGQL: CrearEmpleadoGQL,
                private filtrarEmpleadosGQL: FiltrarEmpleadosGQL, private ngxLoader: NgxUiLoaderService)
    {
    }

    empleados(loader: string): Observable<SingleExecutionResult>
    {
        this.ngxLoader.startLoader(loader);
        return this.empleadosGQL.watch().valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const empleados = $cast<IResolveEmpleado[]>(res.data.empleados);
                this.entityEmpleado.setAll(empleados);
            }
            this.ngxLoader.stopLoader(loader);
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
                this.authEntity.setState(nvosDatos.datosSesion);
                this.ngxToast.satisfactorioToast('Tu avatar se ha cambiado con exito', 'Cambio de avatar');
            }
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
        }));
    }

    empleadosConSesion(): Observable<SingleExecutionResult>
    {
        return this.empleadosSesionGQL.fetch().pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const empleadosSesion = $cast<IResolveEmpleado[]>(res.data.empleadosSesion);
                this.entityEmpleado.setAll(empleadosSesion);
            }
        }));
    }

    filtrarEmpleados(consulta: string, loader: string): Observable<SingleExecutionResult<FiltrarEmpleadosQuery>>
    {
        this.ngxLoader.startLoader(loader);
        return this.filtrarEmpleadosGQL.fetch({consulta}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const filtroEmpleados = $cast<IResolveEmpleado[]>(res.data.filtrarEmpleados);
                this.entityEmpleado.setAll(filtroEmpleados);
            }
            this.ngxLoader.stopLoader(loader);
        }));
    }
}
