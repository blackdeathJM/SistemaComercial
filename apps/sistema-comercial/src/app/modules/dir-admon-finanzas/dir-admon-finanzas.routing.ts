import {Routes} from '@angular/router';
import {DirAdmonFinanzasComponent} from '@s-app/dir-admon-finanzas/dir-admon-finanzas.component';

export const dirAdmonFinanzasRouting: Routes =
    [
        {
            path: '',
            component: DirAdmonFinanzasComponent,
            children:
                [
                    {
                        path: 'recursos-humanos',
                        loadComponent: () => import('@s-app/dir-admon-finanzas/recursos-humanos/recursos-humanos.component').then(r => r.RecursosHumanosComponent)
                        // loadChildren: () => import('@s-app/dir-admon-finanzas/recursos-humanos/recursos-humanos.component').then(r => r.RecursosHumanosComponent)
                    },
                    {
                        path: 'contabilidad',
                        loadComponent: () => import('@s-app/dir-admon-finanzas/contabilidad/contabilidad.component').then(c => c.ContabilidadComponent)
                    },
                    {
                        path: 'compras-servicios',
                        loadComponent: () => import('@s-app/dir-admon-finanzas/compras-servicios/compras-servicios.component').then(c => c.ComprasServiciosComponent)
                    },
                    {
                        path: 'egresos',
                        loadComponent: () => import('@s-app/dir-admon-finanzas/egresos/egresos.component').then(c => c.EgresosComponent)
                    },
                    {
                        path: 'almacen',
                        loadComponent: () => import('@s-app/dir-admon-finanzas/almacen/almacen.component').then(a => a.AlmacenComponent)
                    }
                ]
        }
    ];
