import {AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {BooleanInput} from '@angular/cdk/coercion';
import {Observable, Subscription, tap} from 'rxjs';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {RolCambiadoGQL} from '#/libs/datos/src';
import {AuthService} from '@s-core/auth/auth.service';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {TOKEN} from '@s-auth/const';
import {Select} from '@ngxs/store';
import {StateAuth} from '@s-core/auth/auth.store';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements AfterContentInit
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */
    @Select(StateAuth.sesionActual)
    usuario$: Observable<IDatosSesion>;
    @Input() showAvatar: boolean = true;
    subs: Subscription = new Subscription();

    constructor(private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService, private rolCambiado: RolCambiadoGQL,
                private ngxToatService: NgxToastService)
    {
    }

    ngAfterContentInit(): void
    {
        console.log('AfterContentInit');
        // TODO: Agregar la subscripcion para cambiar el rol
        // this.subs.add(this.rolCambiado.subscribe({_id: STATE_DATOS_SESION()._id}).pipe(tap((res) =>
        // {
        //     if (res.data)
        //     {
        //         localStorage.setItem(TOKEN, res.data.rolCambiado.token);
        //         STATE_DATOS_SESION(res.data.rolCambiado.datosSesion as IDatosSesion);
        //         this.ngxToatService.infoToast('Se han cambiado tus permisos', 'Permisos');
        //     }
        // })).subscribe());
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
}
