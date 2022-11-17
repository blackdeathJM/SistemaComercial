import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';

@Injectable({
    providedIn: 'root'
})
export class RecursosHumanosGuard implements CanActivate
{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return STATE_DATOS_SESION().auth.usuario === 'administrador';
    }
}
