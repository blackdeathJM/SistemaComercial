import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';

@Injectable({
    providedIn: 'root'
})
export class RecursosHumanosGuard implements CanActivate
{
    constructor(private stateAuth: StateAuth, private ngxTotastService: NgxToastService)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        if (this.stateAuth.snapshot.auth.usuario === 'administrador')
        {
            return true;
        }
        this.ngxTotastService.alertaToast('No cuentas con los privilegios necesario para acceder a este modulo', 'Permiso denegado');
        return false;
    }
}
