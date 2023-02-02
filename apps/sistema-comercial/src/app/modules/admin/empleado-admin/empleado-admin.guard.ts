import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {Administrador} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/administrador/administrador';

@Injectable({
    providedIn: 'root'
})
export class EmpleadoAdminGuard implements CanActivate
{
    constructor(private stateAuth: StateAuth)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return this.stateAuth.snapshot.auth.guards.includes(Administrador.rutaAdminSesion);
    }

}
