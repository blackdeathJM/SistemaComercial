import {Routes} from "@angular/router";
import {RecursosHumanosComponent} from "@s-app/dir-admon-finanzas/recursos-humanos/recursos-humanos.component";

export const recursosHumanosRouting: Routes =
    [
        {
            path: '',
            component: RecursosHumanosComponent,
            children:
                [
                    {
                        path: 'empleados',
                        loadComponent: () => import('@s-app/dir-admon-finanzas/recursos-humanos/empleados/empleados.component').then(e => e.EmpleadosComponent)
                    }
                ]
        }
    ];
