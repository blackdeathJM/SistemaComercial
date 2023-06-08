import {inject, Injectable} from '@angular/core';
import {Constantes} from '@s-shared/constantes';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {AuthQuery} from '@s-core/auth/store/auth.query';

@Injectable({ providedIn: 'root' })
class MatchService
{
    constructor(private authQuery: AuthQuery, private ngxToast: NgxToastService)
    {
    }

    accesoRutas(role: string): boolean
    {
        if (this.authQuery.getValue().auth.usuario === Constantes.admin)
        {
            return true;
        }
        if (!this.authQuery.getValue().auth.guards)
        {
            return false;
        }
        if (!this.authQuery.getValue().auth.guards.includes(role))
        {
            this.ngxToast.alertaToast(Constantes.mensaje, 'Acceso denegado');
            return false;
        }
        return true;
    }
}

export const permisoRuta = (role: string, matchService = inject(MatchService)): boolean => matchService.accesoRutas(role);
