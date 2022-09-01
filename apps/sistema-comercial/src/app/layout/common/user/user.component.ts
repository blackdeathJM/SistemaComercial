import {AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {BooleanInput} from '@angular/cdk/coercion';
import {Subject} from 'rxjs';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth.interface';
import {AuthService} from '@s-app/auth/auth.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements OnDestroy, AfterContentInit
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: IDatosSesion;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService)
    {
    }

    ngAfterContentInit(): void
    {
        this.user = STATE_DATOS_SESION();
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
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
