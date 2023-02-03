import {Routes} from '@angular/router';
import {AdminComponent} from '@s-admin/admin.component';

export const adminRouting: Routes =
    [
        {
            path: '',
            component: AdminComponent,
            children:
                [
                    {
                        path: 'empleados-sesion',
                        loadComponent: () => import('@s-admin/empleado-admin/empleado-admin.component').then(c => c.EmpleadoAdminComponent),
                        canActivate: [],
                        children:
                            [
                                {
                                    path: 'lista-roles/:_id',
                                    loadComponent: () => import('@s-admin/empleado-admin/lista-roles/lista-roles.component').then(c => c.ListaRolesComponent)
                                }
                            ]
                    }
                ]
        }
    ];
