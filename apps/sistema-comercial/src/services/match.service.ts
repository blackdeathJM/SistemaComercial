import {inject, Injectable} from '@angular/core';
import {AuthEntity} from '@s-core/auth/store/auth.entity';
import {Constantes} from '@s-shared/constantes';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {isNil} from '@angular-ru/cdk/utils';

@Injectable({providedIn: 'root'})
class MatchService
{
    constructor(private stateAuth: AuthEntity, private ngxToast: NgxToastService)
    {
    }

    accesoRutas(role: string): boolean
    {
        if (this.stateAuth.snapshot.auth.usuario === Constantes.admin)
        {
            return true;
        }
        if (isNil(this.stateAuth.snapshot.auth.guards))
        {
            return false;
        }
        if (!this.stateAuth.snapshot.auth.guards.includes(role))
        {
            this.ngxToast.alertaToast(Constantes.mensaje, 'Acceso denegado');
            return false;
        }
        return true;
    }
}

export const permisoRuta = (role: string, matchService = inject(MatchService)): boolean => matchService.accesoRutas(role);
