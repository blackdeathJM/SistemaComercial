import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminComponent} from '@app/modules/admin/admin.component';
import {DeptosComponent} from '@app/modules/admin/deptos/deptos.component';

const adminRouting: Route[] =
    [
        {
            path: 'administrador',
            component: AdminComponent,
            children:
                [
                    {
                        path: 'deptos',
                        component: DeptosComponent
                    }
                ]
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(adminRouting)],
    exports: [RouterModule]
})
export class AdminRouting
{
}
