import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@s-shared/shared.module';
import {AuthSignOutComponent} from '@s-auth/sign-out/sign-out.component';
import {authSignOutRoutes} from '@s-auth/sign-out/sign-out.routing';
import {FuseCardModule} from '@s-fuse/card';

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
