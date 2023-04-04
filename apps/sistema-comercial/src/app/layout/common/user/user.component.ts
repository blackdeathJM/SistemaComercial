import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {AuthService} from '@s-core/auth/store/auth.service';
import {Subscription} from 'rxjs';
import {AuthQuery} from '@s-core/auth/store/auth.query';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements AfterViewInit, OnDestroy
{
    @Input() showAvatar: boolean = true;
    sub = new Subscription();

    constructor(private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService, public authQuery: AuthQuery)
    {
    }

    ngAfterViewInit(): void
    {
        this.sub.add(this.authService.rolCambiado(this.authQuery.getValue()._id).subscribe());
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
        this.authService.cerrarSesion();
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
