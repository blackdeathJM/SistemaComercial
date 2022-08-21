import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminComponent} from '@s-app/modules/admin/admin.component';

const adminRouting: Routes =
    [
        {
            path: 'administrador',
            component: AdminComponent,
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(adminRouting)],
    exports: [RouterModule]
})
export class AdminRouting
{
}
