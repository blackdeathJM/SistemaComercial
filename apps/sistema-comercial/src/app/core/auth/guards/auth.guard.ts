import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {AuthService} from '#/apps/sistema-comercial/src/app/core/auth/auth.service';
import {NavigationService} from '#/apps/sistema-comercial/src/app/core/navigation/navigation.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad
{
    constructor(private _authService: AuthService, private _router: Router, private navegacionService: NavigationService)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
    {
        return this._check('/');
    }

    private _check(redirectURL: string): Observable<boolean>
    {
        // Check the authentication status
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
}
