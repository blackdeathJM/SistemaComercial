import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@s-shared/shared.module';
import {AuthResetPasswordComponent} from '@s-auth/reset-password/reset-password.component';
import {authResetPasswordRoutes} from '@s-auth/reset-password/reset-password.routing';
import {FuseCardModule} from '@s-fuse/card';
import {FuseAlertModule} from '@s-fuse/alert';

@NgModule({
    declarations: [
        AuthResetPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(authResetPasswordRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule
    ]
})
export class AuthResetPasswordModule
{
}
