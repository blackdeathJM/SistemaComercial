import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {StateAuth} from '@s-core/auth/store/auth.store';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad
{
    constructor(private ngxToastService: NgxToastService, private stateAuth: StateAuth)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        if (this.stateAuth.snapshot.auth.usuario === 'administrador')
        {
            return true;
        }
        this.ngxToastService.alertaToast('No tienes permiso para acceder a esta ruta', 'Acceso denegado');
        return false;
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return true;
    }
}
