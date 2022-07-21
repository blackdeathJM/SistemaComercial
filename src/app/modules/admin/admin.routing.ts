import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminComponent} from '@app/modules/admin/admin.component';
import {DeptosComponent} from '@app/modules/admin/deptos/deptos.component';
import {UsuariosComponent} from '@app/modules/admin/usuarios/usuarios.component';

const adminRouting: Routes =
    [
        {
            path: 'administrador',
            component: AdminComponent,
            children:
                [
                    {
                        path: 'deptos',
                        component: DeptosComponent
                    },
                    {
                        path: 'usuarios',
                        component: UsuariosComponent
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
