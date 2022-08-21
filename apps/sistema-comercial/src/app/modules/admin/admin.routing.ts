import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminComponent} from '@s-app/modules/admin/admin.component';

const adminRouting: Route[] =
    [
        {
            path: 'administrador',
            component: AdminComponent,
            children:
                [
                    {path: '', loadChildren: () => import('@s-app/empleado/empleado.module').then(m => m.EmpleadoModule)}
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
