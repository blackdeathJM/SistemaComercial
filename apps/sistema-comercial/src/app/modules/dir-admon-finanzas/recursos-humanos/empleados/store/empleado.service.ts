import {Injectable} from '@angular/core';
import {
    ActualizarAvatarGQL, ActualizarContrasenaAdminGQL, CrearActEmpledoGQL, CrearActEmpledoMutation, EmpleadosGQL, EmpleadosSesionGQL
} from '#/libs/datos/src';
import {catchError, finalize, Observable, tap} from 'rxjs';
import {makeVar, SingleExecutionResult} from '@apollo/client';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {IModificado} from '#/libs/models/src/lib/common/common.interface';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {TOKEN} from '@s-auth/const';
import {ILoginRespuesta} from '#/libs/models/src/lib/admin/empleado/auth/login.dto';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AuthStore} from '@s-core/auth/store/auth.store';
import {EmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/empleado.store';
import {GeneralService} from "@s-services/general.service";
import {TRegEmpleado} from "#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.dto";
import {isNotNil} from "@angular-ru/cdk/utils";

export const ngxLoaderEmp = makeVar<string>('ngxLoaderEmpleados');

@Injectable({providedIn: 'root'})
export class EmpleadoService
{

    constructor(private empleadosGQL: EmpleadosGQL, private actualizarContrasenaGQL: ActualizarContrasenaAdminGQL, private ngxToast: NgxToastService,
                private actualizarAvtarGQL: ActualizarAvatarGQL, private empleadosSesionGQL: EmpleadosSesionGQL, private crearActEmpledoGQL: CrearActEmpledoGQL,
                private ngxLoader: NgxUiLoaderService, private authStore: AuthStore, private empleadoStore: EmpleadoStore, private generalService: GeneralService)
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

    crearActEmpledo(empleado: TRegEmpleado): Observable<SingleExecutionResult<CrearActEmpledoMutation>>
    {
        return this.crearActEmpledoGQL.mutate({empleadoDatos: empleado}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                const {_id, ...cambios} = res.data.crearActEmpledo as IResolveEmpleado;
                // this.entityEmpleado.addOne(nvoEmpleado);
                const existe = this.empleadoStore.getValue().ids.includes(_id);
                if (existe)
                {
                    this.empleadoStore.update(_id, {...cambios});
                } else
                {
                    this.empleadoStore.add(res.data.crearActEmpledo);
                }
                this.ngxToast.satisfactorioToast('El empleado fue dado de alta con exito', 'Alta empleados');
            }
        }));
    }

    empleadosConSesion(): Observable<SingleExecutionResult>
    {
        return this.empleadosSesionGQL.fetch().pipe(catchError(err => this.generalService.cacharError(err)),
            tap((res) =>
            {
                if (isNotNil(res) && isNotNil(res.data))
                {
                    const empleadosSesion = res.data.empleadosSesion as IResolveEmpleado[];
                    // this.entityEmpleado.setAll(empleadosSesion);
                    this.empleadoStore.set(empleadosSesion);
                }
            }));
    }
}
