import {Injectable} from '@angular/core';
import {ActualizarAvatarGQL, ActualizarContrasenaAdminGQL, CrearEmpleadoGQL, EmpleadosGQL, EmpleadosSesionGQL, FiltrarEmpleadosConSesionGQL, FiltrarEmpleadosConSesionQuery} from '#/libs/datos/src';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {IResolveEmpleado, TRegEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {IModificado} from '#/libs/models/src/lib/common/common.interface';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {TOKEN} from '@s-auth/const';
import {ILoginRespuesta} from '#/libs/models/src/lib/admin/empleado/auth/login.dto';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {NgxUiLoaderService} from 'ngx-ui-loader';

export const loaderEmpleados = 'listaEmpleados';

@Injectable({providedIn: 'root'})
export class EmpleadoService
{
    #panel = new BehaviorSubject<boolean>(false);

    constructor(private empleadosGQL: EmpleadosGQL, private entityEmpleado: EntityEmpleadoStore, private actualizarContrasenaGQL: ActualizarContrasenaAdminGQL, private ngxToast: NgxToastService,
                private actualizarAvtarGQL: ActualizarAvatarGQL, private stateAuth: StateAuth, private empleadosSesionGQL: EmpleadosSesionGQL, private crearEmpleadoGQL: CrearEmpleadoGQL,
                private filtrarEmpleadosConSesionGQL: FiltrarEmpleadosConSesionGQL, private ngxLoader: NgxUiLoaderService)
    {
    }

    get getPanel(): Observable<boolean>
    {
        return this.#panel.asObservable();
    }

    set setPanel(v: boolean)
    {
        this.#panel.next(v);
    }

    empleados(): Observable<SingleExecutionResult>
    {
        this.ngxLoader.startLoader(loaderEmpleados);
        return this.empleadosGQL.watch().valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const empleados = $cast<IResolveEmpleado[]>(res.data.empleados);
                this.entityEmpleado.setAll(empleados);
            }
            this.ngxLoader.stopLoader(loaderEmpleados);
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
        return this.empleadosSesionGQL.watch().valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const empleadosSesion = $cast<IResolveEmpleado[]>(res.data.empleadosSesion);
                this.entityEmpleado.setAll(empleadosSesion);
            }
        }));
    }

    filtrarEmpleadosConSesion(consulta: string): Observable<SingleExecutionResult<FiltrarEmpleadosConSesionQuery>>
    {
        this.ngxLoader.startLoader(loaderEmpleados);
        return this.filtrarEmpleadosConSesionGQL.watch({consulta}).valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const filtroEmpleados = $cast<IResolveEmpleado[]>(res.data.filtrarEmpleadosConSesion);
                this.entityEmpleado.setAll(filtroEmpleados);
            }
            this.ngxLoader.stopLoader(loaderEmpleados);
        }));
    }
}
