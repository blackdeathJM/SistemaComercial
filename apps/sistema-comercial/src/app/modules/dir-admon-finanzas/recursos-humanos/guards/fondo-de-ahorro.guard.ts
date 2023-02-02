import {Injectable} from '@angular/core';
import {CanActivate, UrlTree} from '@angular/router';
import {GuardRecursosHumanos} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/recursos-humanos';
import {Observable} from 'rxjs';
import {GeneralService} from '@s-services/general.service';

@Injectable({providedIn: 'root'})
export class FondoDeAhorroGuard implements CanActivate
{
    constructor(private generalService: GeneralService)
    {
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return this.generalService.accesoARuta(GuardRecursosHumanos.fondoDeAhoro);
    }
}
