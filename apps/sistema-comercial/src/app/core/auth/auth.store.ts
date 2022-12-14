import {Computed, DataAction, Payload, Persistence, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {ILoginRespuesta} from '#/libs/models/src/lib/admin/empleado/auth/login.dto';
import {Injectable} from '@angular/core';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {TOKEN} from '@s-auth/const';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';

@Persistence()
@StateRepository()
@State<ILoginRespuesta>({
    name: 'auth',
    defaults: {token: null, datosSesion: null}
})
@Injectable()
export class StateAuth extends NgxsImmutableDataRepository<ILoginRespuesta>
{
    constructor(private jwtHelperService: JwtHelperService, private router: Router)
    {
        super();
    }

    @Selector()
    public static sesionActual(state: ILoginRespuesta): ILoginRespuesta
    {
        return {datosSesion: state.datosSesion, token: state.token};
    }

    @Selector()
    public estaAutenticado(): boolean
    {
        if (this.getState())
        {
            return true;
        }
    }

    @DataAction({subscribeRequired: true})
    public login(@Payload('sesion') datosSesion: IDatosSesion, token: string): void
    {
        this.ctx.setState({datosSesion, token});
    }

    @DataAction({subscribeRequired: false})
    validarToken(): void
    {
        //Validar token para iniciar sesion con el token
        if (this.jwtHelperService.tokenGetter() && !this.jwtHelperService.isTokenExpired())
        {

        } else
        {
        }
    }

    @DataAction({subscribeRequired: false})
    cerrarSesion(): void
    {
        localStorage.removeItem(TOKEN);
        this.router.navigate(['/sign-in']).then();
    }
}
