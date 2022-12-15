import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {Observable, of} from 'rxjs';

import {StateAuth} from '@s-core/auth/auth.store';
import {isNotNil} from '@angular-ru/cdk/utils';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad
{
    constructor(private _router: Router, private stateAuth: StateAuth)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this.validarSesion(redirectUrl);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this.validarSesion(redirectUrl);
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
    {
        return this.validarSesion('/');
    }

    private validarSesion(redirectURL: string): Observable<boolean>
    {

        if (isNotNil(this.stateAuth.snapshot))
        {
            return of(true);
        }
        return of(this.stateAuth.validarToken(redirectURL));
    }
}
