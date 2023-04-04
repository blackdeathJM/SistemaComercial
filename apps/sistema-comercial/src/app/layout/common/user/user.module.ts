import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@s-shared/shared.module';
import {RouterLink} from '@angular/router';
import {UserComponent} from '@s-layout/user/user.component';
import {NgOptimizedImage} from "@angular/common";

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
        RouterLink,
        NgOptimizedImage
    ],
    exports     : [
        UserComponent
    ]
})
export class UserModule
{
}
