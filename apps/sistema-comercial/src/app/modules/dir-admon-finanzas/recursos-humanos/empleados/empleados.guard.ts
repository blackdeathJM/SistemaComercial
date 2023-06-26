import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthEntity} from '@s-core/auth/store/auth.entity';

@Injectable({
    providedIn: 'root'
})
export class EmpleadosGuard implements CanActivate
{
    constructor(private stateAuth: AuthEntity)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return this.stateAuth.snapshot.auth.usuario === 'administrador';
    }
}
