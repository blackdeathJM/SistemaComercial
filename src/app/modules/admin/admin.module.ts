import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRouting} from '@app/modules/admin/admin.routing';
import {DeptosModule} from '@app/modules/admin/deptos/deptos.module';


@NgModule({
    declarations:
        [
            AdminComponent
        ],
    imports:
        [
            CommonModule,
            DeptosModule,
            AdminRouting
        ]
})
export class AdminModule
{
}
