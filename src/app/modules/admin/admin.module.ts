import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminRouting} from '@s-app/modules/admin/admin.routing';


@NgModule({
    declarations:
        [
            AdminComponent
        ],
    imports:
        [
            AdminRouting
        ]
})
export class AdminModule
{
}
