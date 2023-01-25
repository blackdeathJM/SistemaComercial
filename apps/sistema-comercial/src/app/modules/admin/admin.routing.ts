import {Routes} from '@angular/router';
import {AdminComponent} from '@s-admin/admin.component';
import {AdminGuard} from '@s-admin/admin.guard';

export const adminRouting: Routes =
    [
        {
            path: '',
            canActivate: [AdminGuard],
            component: AdminComponent,
            children:
                [
                    {
                        path: 'empleados-sesion',
                        loadComponent: () => import('@s-admin/empleado-admin/empleado-admin.component').then(c => c.EmpleadoAdminComponent)
                    }
                ]
        }
    ];
