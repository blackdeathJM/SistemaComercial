import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {AuthService} from '#/apps/sistema-comercial/src/app/core/auth/auth.service';
import {StateAuth} from '@s-core/auth/auth.store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad
{
    constructor(private _authService: AuthService, private _router: Router, private stateAuth: StateAuth)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        console.log('canActivate', redirectUrl);
        return this._check(redirectUrl);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        console.log('canActivateChild', redirectUrl);
        return this._check(redirectUrl);
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
    {
        console.log('canLoad');
        return this._check('/');
    }

    private _check(redirectURL: string): Observable<boolean>
    {
        return this._authService.check()
            .pipe(switchMap((authenticated) =>
            {

                // Si el usuario no esta atenticado
                if (!authenticated)
                {
                    // Redirige a la pagina de login
                    this._router.navigate(['sign-in'], {queryParams: {redirectURL}}).then();

                    // Prevent the access
                    return of(false);
                }
                return of(true);
            }));
    }

    private validarSesion(redirectUrl: string): Observable<boolean>
    {
        const sesionActual = this.stateAuth.snapshot.datosSesion;
        console.log('sesionActual', sesionActual);
        return of(true);
    }
}
