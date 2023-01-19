import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StateAuth} from '@s-core/auth/store/auth.store';

@Injectable({providedIn: 'root'})
export class InfoGralEmpleadoGuard implements CanActivate
{
    constructor()
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return true;
    }
}
