import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad
{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return STATE_DATOS_SESION().auth.usuario === 'administrador';
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return true;
    }
}
