import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation} from '@angular/core';
import {BooleanInput} from '@angular/cdk/coercion';
import {Observable} from 'rxjs';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {RolCambiadoGQL} from '#/libs/datos/src';
import {Select} from '@ngxs/store';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {Router} from '@angular/router';
import {TOKEN} from '@s-auth/const';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */
    @Select(StateAuth.sesionActual) usuario$: Observable<IDatosSesion>;
    @Input() showAvatar: boolean = true;

    constructor(private _changeDetectorRef: ChangeDetectorRef, private rolCambiado: RolCambiadoGQL, private router: Router, private stateAuth: StateAuth)
    {
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
        localStorage.removeItem(TOKEN);
        this.stateAuth.reset();
        this.router.navigateByUrl('/sign-in').then();
    }
}
