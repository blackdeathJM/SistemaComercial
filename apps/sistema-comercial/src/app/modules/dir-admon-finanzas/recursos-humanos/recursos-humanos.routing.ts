import {Routes} from '@angular/router';
import {RecursosHumanosComponent} from '@s-dirAdmonFinanzas/recursos-humanos.component';
import {RecursosHumanosGuard} from '@s-dirAdmonFinanzas/recursos-humanos.guard';

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
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/empleados.component').then(e => e.EmpleadosComponent)
                    }
                ]
        }
    ];
