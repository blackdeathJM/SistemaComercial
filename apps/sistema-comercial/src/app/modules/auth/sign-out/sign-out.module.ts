import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@s-fuse/components/card';
import { SharedModule } from '@s-shared/shared.module';
import { AuthSignOutComponent } from '@s-app/modules/auth/sign-out/sign-out.component';
import { authSignOutRoutes } from '@s-app/modules/auth/sign-out/sign-out.routing';

@NgModule({
    declarations: [
        AuthSignOutComponent
    ],
    imports     : [
        RouterModule.forChild(authSignOutRoutes),
        MatButtonModule,
        FuseCardModule,
        SharedModule
    ]
})
export class AuthSignOutModule
{
}
