import {Routes} from '@angular/router';
import {EmpleadosComponent} from '@s-dirAdmonFinanzas/empleados/empleados.component';
import {InfoGralEmpleadoGuard} from '@s-dirAdmonFinanzas/empleados/info-gral-empleado/info-gral-empleado.guard';

export const empleadosRouting: Routes =
    [
        {
            path: '',
            component: EmpleadosComponent,
            children:
                [
                    {
                        path: 'info-general',
                        canActivate: [InfoGralEmpleadoGuard],
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/info-gral-empleado/info-gral-empleado.component').then(c => c.InfoGralEmpleadoComponent)
                    },
                    {
                        path: 'imss',
                        canActivate: [],
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/imss/imss.component').then(c => c.ImssComponent)
                    },
                    {
                        path: 'nomina',
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/nomina/nomina.component').then(c => c.NominaComponent)
                    },
                    {
                        path: 'retardos',
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/ctrl-retardos/ctrl-retardos.component').then(c => c.CtrlRetardosComponent)
                    },
                    {
                        path: 'fondo-de-ahorro',
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/fondo-de-ahorro/fondo-de-ahorro.component').then(c => c.FondoDeAhorroComponent)
                    },
                    {
                        path: 'prestamos',
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/prestamos/prestamos.component').then(c => c.PrestamosComponent)
                    }
                ]
        }
    ];
