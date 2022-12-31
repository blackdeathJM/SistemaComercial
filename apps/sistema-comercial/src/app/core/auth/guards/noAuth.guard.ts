import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {Observable, of} from 'rxjs';
import {StateAuth} from '@s-core/auth/auth.store';
import {isNotNil} from '@angular-ru/cdk/utils';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad
{
    constructor(private _router: Router, private stateAuth: StateAuth)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        return this.validarSesion();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        return this.validarSesion();
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
    {
        return this.validarSesion();
    }

    private validarSesion(): Observable<boolean>
    {
        console.log('noAuthGuard');
        // Si se tiene sesion activa evita que entre a las rutas del login, ya que solo el usuario no logeado pueden accesar al componente
        if (isNotNil(this.stateAuth.snapshot))
        {
            this._router.navigate(['']).then();
            return of(false);
        }
        return of(true);
    }
}
