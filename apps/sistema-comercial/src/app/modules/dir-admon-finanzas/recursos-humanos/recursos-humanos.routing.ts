import {Routes} from '@angular/router';
import {RecursosHumanosComponent} from '@s-dirAdmonFinanzas/recursos-humanos.component';

export const recursosHumanosRouting: Routes =
    [
        {
            path: '',
            component: RecursosHumanosComponent,
            children:
                [
                    {
                        path: 'empleados',
                        loadChildren: () => import('@s-dirAdmonFinanzas/empleados/empleados.routing').then(e => e.empleadosRouting)
                    }
                ]
        }
    ];
