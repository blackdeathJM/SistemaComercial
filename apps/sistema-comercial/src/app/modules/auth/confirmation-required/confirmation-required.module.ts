import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@s-shared/shared.module';
import {AuthConfirmationRequiredComponent} from '@s-auth/confirmation-required/confirmation-required.component';
import {authConfirmationRequiredRoutes} from '@s-auth/confirmation-required/confirmation-required.routing';
import {FuseCardModule} from '@s-fuse/card';

@NgModule({
    declarations: [
        AuthConfirmationRequiredComponent
    ],
    imports     : [
        RouterModule.forChild(authConfirmationRequiredRoutes),
        MatButtonModule,
        FuseCardModule,
        SharedModule
    ]
})
export class AuthConfirmationRequiredModule
{
}
