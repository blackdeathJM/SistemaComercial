import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {TOKEN} from '@s-auth/const';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {ValidarTokenGQL} from '#/libs/datos/src';
import {tap} from 'rxjs';

@StateRepository()
@State<IDatosSesion>({
    name: 'auth',
    defaults: null
})
@Injectable()
export class StateAuth extends NgxsImmutableDataRepository<IDatosSesion>
{
    constructor(private jwtHelperService: JwtHelperService, private router: Router, private validarTokenGQL: ValidarTokenGQL)
    {
        super();
    }

    @Selector()
    public static sesionActual(state: IDatosSesion): IDatosSesion
    {
        return state;
    }

    @DataAction({subscribeRequired: true})
    public login(@Payload('sesion') datosSesion: IDatosSesion): void
    {
        this.ctx.setState(datosSesion);
    }

    @DataAction({subscribeRequired: false})
    public cerrarSesion(redirectURL: string): void
    {
        localStorage.removeItem(TOKEN);
        this.router.navigate(['/sign-in'], {queryParams: {redirectURL}}).then();
    }

    public validarToken(redirectURL: string = '/'): boolean
    {
        //Validar token para iniciar sesion con el token
        const token = this.jwtHelperService.tokenGetter();
        if (token && !this.jwtHelperService.isTokenExpired())
        {
            this.validarTokenGQL.mutate({token}).pipe(tap((res) =>
            {
                if (res.data)
                {
                    const sesionPorToken = res.data.validarToken as IDatosSesion;
                    this.ctx.setState(sesionPorToken);
                    return true;
                } else
                {
                    this.cerrarSesion(redirectURL);
                }
            }));
        }
        this.cerrarSesion(redirectURL);
        return false;
    }
}
