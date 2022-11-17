import {Routes} from '@angular/router';
import {RecursosHumanosComponent} from '@s-app/dir-admon-finanzas/recursos-humanos/recursos-humanos.component';
import {RecursosHumanosGuard} from '@s-app/dir-admon-finanzas/recursos-humanos/recursos-humanos.guard';

export const recursosHumanosRouting: Routes =
    [
        {
            path: '',
            component: RecursosHumanosComponent,
            canActivate: [RecursosHumanosGuard],
            children:
                [
                    {
                        path: 'empleados',
                        loadComponent: () => import('@s-app/dir-admon-finanzas/recursos-humanos/empleados/empleados.component').then(e => e.EmpleadosComponent)
                    }
                ]
        }
    ];
