import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {
    ActualizarContrasenaAdminGQL, ActualizarContrasenaAdminMutation, LoginGQL, RegistroSesionGQL, RegistroSesionMutation, RolCambiadoGQL,
    RolCambiadoSubscription
} from '#/libs/datos/src';
import {catchError, finalize, Observable, of, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {ILogin, ILoginRespuesta} from '#/libs/models/src/lib/admin/empleado/auth/login.dto';
import {TOKEN} from '@s-auth/const';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAuth, ICambioContrasena, IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {IModificado} from '#/libs/models/src/lib/common/common.interface';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {SubscriptionResult} from 'apollo-angular';
import {AuthStore} from '@s-core/auth/store/auth.store';
import {AuthQuery} from '@s-core/auth/store/auth.query';
import {EmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/empleado.store';
import {isNil, isEmpty} from 'lodash-es';
import {GeneralService} from '@s-services/general.service';
import {isNotNil} from "@angular-ru/cdk/utils";

@Injectable({providedIn: 'root'})
export class AuthService
{
    constructor(private jwtHelperService: JwtHelperService, private loginGQL: LoginGQL, private ngxToast: NgxToastService, private router: Router, private rolCambiadoGQL: RolCambiadoGQL,
                private activatedRoute: ActivatedRoute, private actPassGQL: ActualizarContrasenaAdminGQL, private registroSesionGQL: RegistroSesionGQL, private authStore: AuthStore,
                private authQuery: AuthQuery, private empleadoStore: EmpleadoStore, private generalService: GeneralService)
    {
    }

    login(login: ILogin): Observable<SingleExecutionResult>
    {
        return this.loginGQL.mutate({login}).pipe(
            catchError(err => this.generalService.cacharError(err)),
            tap((res) =>
            {
                if (isNotNil(res) && isNotNil(res.data))
                {
                    const respuestaLogin = res.data.login as ILoginRespuesta;
                    localStorage.setItem(TOKEN, respuestaLogin.token);

                    // this.authEntity.setState(respuestaLogin.datosSesion);
                    this.authStore.update(respuestaLogin.datosSesion);

                    const redireccionUrl = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') || '/redireccion';
                    this.router.navigateByUrl(redireccionUrl).then();
                }
            }));
    }

    validarSesion(): Observable<boolean>
    {
        if (isNil(this.jwtHelperService.tokenGetter()))
        {
            return of(false);
        }
        if (this.jwtHelperService.isTokenExpired())
        {
            return of(false);
        }

        if (!isEmpty(this.authQuery.getValue()))
        {
            return of(true);
        }
        const sesionPorToken = this.jwtHelperService.decodeToken();
        // this.authEntity.setState(sesionPorToken);
        this.authStore.update(sesionPorToken);
        return of(true);
    }

    actualizarContrasena(datos: ICambioContrasena, modificadoPor: IModificado): Observable<SingleExecutionResult<ActualizarContrasenaAdminMutation>>
    {
        return this.actPassGQL.mutate({datos, modificadoPor}).pipe(
            catchError(err => this.generalService.cacharError(err)), tap((res) =>
            {
                if (isNotNil(res) && isNotNil(res.data))
                {
                    this.ngxToast.satisfactorioToast('La contrasena fue actualizada con exito', 'Cambio de contrasena');
                }
            }));
    }

    registroSesion(id: string, auth: IAuth, modificadoPor: IModificado): Observable<SingleExecutionResult<RegistroSesionMutation>>
    {
        return this.registroSesionGQL.mutate({_id: id, auth, modificadoPor}).pipe(
            catchError(err => this.generalService.cacharError(err)), tap((res) =>
            {
                if (isNotNil(res) && isNotNil(res.data))
                {
                    const {_id, ...changes} = res.data.registroSesion as IResolveEmpleado;
                    // this.entityEmpleado.updateOne({id: _id, changes});
                    this.empleadoStore.update(id, changes);

                    this.ngxToast.satisfactorioToast('La sesion fue asignada con exito', 'Asignacion de sesion');
                }
            }));
    }

    rolCambiado(_id: string): Observable<SubscriptionResult<RolCambiadoSubscription>>
    {
        return this.rolCambiadoGQL.subscribe({_id}).pipe(
            catchError(err => this.generalService.cacharError(err)), tap((res) =>
            {
                if (res.data)
                {
                    const rolCambiado = res.data.rolCambiado.datosSesion as IDatosSesion;
                    // this.authEntity.setState(rolCambiado);
                    this.authStore.update(rolCambiado);
                    this.ngxToast.infoToast('Tus permisos fueron cambiados', 'Permisos');
                }
            }));
    }

    cerrarSesion(): void
    {
        localStorage.removeItem(TOKEN);
        this.router.navigateByUrl('/').then(() => this.authStore.reset());
    }
}
