import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@s-fuse/components/card';
import { SharedModule } from '@s-shared/shared.module';
import { AuthConfirmationRequiredComponent } from '@s-app/modules/auth/confirmation-required/confirmation-required.component';
import { authConfirmationRequiredRoutes } from '@s-app/modules/auth/confirmation-required/confirmation-required.routing';

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
