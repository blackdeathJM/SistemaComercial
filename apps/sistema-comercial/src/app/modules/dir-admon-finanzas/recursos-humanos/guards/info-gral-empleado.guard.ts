import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {Constantes} from '@s-shared/constantes';
import {GuardRecursosHumanos} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/recursos-humanos';

@Injectable({providedIn: 'root'})
export class InfoGralEmpleadoGuard implements CanActivate
{
    constructor(private stateAuth: StateAuth)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        if (this.stateAuth.snapshot.auth.usuario === Constantes.admin)
        {
            return true;
        }
        return this.stateAuth.snapshot.auth.guards.includes(GuardRecursosHumanos.infoGralEmpleados);
    }
}
