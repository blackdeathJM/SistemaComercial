import {Routes} from '@angular/router';
import {DirAdmonFinanzasComponent} from '@s-dirAdmonFinanzas/dir-admon-finanzas.component';

export const dirAdmonFinanzasRouting: Routes =
    [
        {
            path: '',
            component: DirAdmonFinanzasComponent,
            children:
                [
                    {
                        path: 'recursos-humanos',
                        loadChildren: () => import('@s-dirAdmonFinanzas/recursos-humanos.routing').then(r => r.recursosHumanosRouting)
                    },
                    // {
                    //     path: 'contabilidad',
                    //     loadComponent: () => import('@s-app/dir-admon-finanzas/contabilidad/contabilidad.component').then(c => c.ContabilidadComponent)
                    // },
                    // {
                    //     path: 'compras-servicios',
                    //     loadComponent: () => import('@s-app/dir-admon-finanzas/compras-servicios/compras-servicios.component').then(c => c.ComprasServiciosComponent)
                    // },
                    // {
                    //     path: 'egresos',
                    //     loadComponent: () => import('@s-app/dir-admon-finanzas/egresos/egresos.component').then(c => c.EgresosComponent)
                    // },
                    // {
                    //     path: 'almacen',
                    //     loadComponent: () => import('@s-app/dir-admon-finanzas/almacen/almacen.component').then(a => a.AlmacenComponent)
                    // }
                ]
        }
    ];
