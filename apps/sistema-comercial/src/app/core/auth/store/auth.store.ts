import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsOnInit, Selector, State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {TOKEN} from '@s-auth/const';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {ValidarTokenGQL} from '#/libs/datos/src';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';

@StateRepository()
@State<IDatosSesion>({
    name: 'auth',
    defaults: null
})
@Injectable()
export class StateAuth extends NgxsImmutableDataRepository<IDatosSesion> implements NgxsOnInit
{
    constructor(private jwtHelperService: JwtHelperService, private router: Router)
    {
        super();
    }

    @Selector()
    public static sesionActual(state: IDatosSesion): IDatosSesion
    {
        return state;
    }

    @DataAction()
    cerrarSesion(): void
    {
        localStorage.removeItem(TOKEN);
        this.router.navigate(['/sign-in']).then(() => this.reset());
    }

    public ngxsOnInit(): void
    {
        console.log('NgxsOnInit');
    }
}
