import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserComponent } from '@s-app/layout/common/user/user.component';
import { SharedModule } from '@s-shared/shared.module';
import {RouterLink} from "@angular/router";

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        SharedModule,
        RouterLink
    ],
    exports     : [
        UserComponent
    ]
})
export class UserModule
{
}
