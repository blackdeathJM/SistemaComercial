import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ActualizarContrasenaAdminGQL, ActualizarContrasenaAdminMutation, LoginGQL, RegistroSesionGQL, RegistroSesionMutation} from '#/libs/datos/src';
import {Observable, of, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {ILogin, ILoginRespuesta} from '#/libs/models/src/lib/admin/empleado/auth/login.dto';
import {$cast, isNil, isNotNil} from '@angular-ru/cdk/utils';
import {TOKEN} from '@s-auth/const';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {IAuth, ICambioContrasena} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {IModificado} from '#/libs/models/src/lib/common/common.interface';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';

@Injectable({providedIn: 'root'})
export class AuthService
{
    constructor(private jwtHelperService: JwtHelperService, private loginGQL: LoginGQL, private ngxToast: NgxToastService, private router: Router,
                private stateAuth: StateAuth, private activatedRoute: ActivatedRoute, private actualizarContrasenaAdminGQL: ActualizarContrasenaAdminGQL,
                private registroSesionGQL: RegistroSesionGQL, private entityEmpleado: EntityEmpleadoStore)
    {
    }

    login(login: ILogin): Observable<SingleExecutionResult>
    {
        return this.loginGQL.mutate({login}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const respuestaLogin = $cast<ILoginRespuesta>(res.data.login);
                localStorage.setItem(TOKEN, respuestaLogin.token);
                this.stateAuth.setState(respuestaLogin.datosSesion);

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
        if (isNotNil(this.stateAuth.snapshot))
        {
            return of(true);
        }
        const sesionPorToken = this.jwtHelperService.decodeToken();
        this.stateAuth.setState(sesionPorToken);
        return of(true);
    }

    actualizarContrasena(datos: ICambioContrasena, modificadoPor: IModificado): Observable<SingleExecutionResult<ActualizarContrasenaAdminMutation>>
    {
        return this.actualizarContrasenaAdminGQL.mutate({datos, modificadoPor}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                this.ngxToast.satisfactorioToast('La contrasena fue actualizada con exito', 'Cambio de contrasena');
            }
        }));
    }

    registroSesion(_id: string, auth: IAuth, modificadoPor: IModificado): Observable<SingleExecutionResult<RegistroSesionMutation>>
    {
        return this.registroSesionGQL.mutate({_id, auth, modificadoPor}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const changes = $cast<IResolveEmpleado>(res.data.registroSesion);
                this.entityEmpleado.updateOne({id: changes._id, changes});
                this.ngxToast.satisfactorioToast('La sesion fue asignada con exito', 'Asignacion de sesion');
            }
        }));
    }

    cerrarSesion(): void
    {
        localStorage.removeItem(TOKEN);
        this.router.navigateByUrl('/').then(() => this.stateAuth.reset());
    }
}
