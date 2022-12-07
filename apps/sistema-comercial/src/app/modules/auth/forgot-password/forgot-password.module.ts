import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@s-shared/shared.module';
import {AuthForgotPasswordComponent} from '@s-auth/forgot-password/forgot-password.component';
import {authForgotPasswordRoutes} from '@s-auth/forgot-password/forgot-password.routing';
import {FuseCardModule} from '@s-fuse/card';
import {FuseAlertModule} from '@s-fuse/alert';

@NgModule({
    declarations: [
        AuthForgotPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(authForgotPasswordRoutes),
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
export class AuthForgotPasswordModule
{
}
