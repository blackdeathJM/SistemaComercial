import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminRouting} from '@s-app/modules/admin/admin.routing';
import {SharedModule} from '@s-shared/shared.module';
import {DeptosModule} from '@s-app/deptos/deptos.module';
import {NgSwitch} from '@angular/common';

@NgModule({
    declarations:
        [
            AdminComponent
        ],
    imports:
        [
            AdminRouting,
            SharedModule,
            NgSwitch,
            DeptosModule
        ]
})
export class AdminModule
{
}
