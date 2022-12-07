import {AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {BooleanInput} from '@angular/cdk/coercion';
import {Subscription, tap} from 'rxjs';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {RolCambiadoGQL} from '#/libs/datos/src';
import {AuthService} from '@s-core/auth/auth.service';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {STATE_DATOS_SESION} from '@s-core/auth/auth.state';
import {TOKEN} from '@s-auth/const';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements OnDestroy, AfterContentInit, AfterViewInit
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: IDatosSesion;
    subs: Subscription = new Subscription();

    constructor(private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService, private rolCambiado: RolCambiadoGQL,
                private ngxToatService: NgxToastService)
    {
    }

    ngAfterContentInit(): void
    {
        this.user = STATE_DATOS_SESION();
    }

    ngAfterViewInit(): void
    {
        this.subs.add(this.rolCambiado.subscribe({_id: STATE_DATOS_SESION()._id}).pipe(tap((res) =>
        {
            if (res.data)
            {
                localStorage.setItem(TOKEN, res.data.rolCambiado.token);
                STATE_DATOS_SESION(res.data.rolCambiado.datosSesion as IDatosSesion);
                this.ngxToatService.infoToast('Se han cambiado tus permisos', 'Permisos');
            }
        })).subscribe());
    }

    updateUserStatus(status: string): void
    {
        // TODO: Actualizar el estado del usuario
        // if (!this.user)
        // {
        //     return;
        // }
        //
        // // Update the user
        // this._userService.update({
        //     ...this.user,
        //     status
        // }).subscribe();
    }

    signOut(): void
    {
        this.authService.signOut();
    }

    ngOnDestroy(): void
    {

    }
}
