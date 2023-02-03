import {Routes} from '@angular/router';
import {EmpleadosComponent} from '@s-dirAdmonFinanzas/empleados/empleados.component';
import {permisoRuta} from '@s-services/match.service';
import {GuardRecursosHumanos} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/recursos-humanos';

export const empleadosRouting: Routes =
    [
        {
            path: '',
            component: EmpleadosComponent,
            children:
                [
                    {
                        path: 'info-general',
                        canActivate: [(): boolean => permisoRuta(GuardRecursosHumanos.infoGralEmpleados)],
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/info-gral-empleado/info-gral-empleado.component').then(c => c.InfoGralEmpleadoComponent)
                    },
                    {
                        path: 'imss',
                        canActivate: [(): boolean => permisoRuta(GuardRecursosHumanos.imss)],
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/imss/imss.component').then(c => c.ImssComponent)
                    },
                    {
                        path: 'nomina',
                        canActivate: [(): boolean => permisoRuta(GuardRecursosHumanos.nomina)],
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/nomina/nomina.component').then(c => c.NominaComponent)
                    },
                    {
                        path: 'retardos',
                        canActivate: [(): boolean => permisoRuta(GuardRecursosHumanos.retardos)],
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/ctrl-retardos/ctrl-retardos.component').then(c => c.CtrlRetardosComponent)
                    },
                    {
                        path: 'fondo-de-ahorro',
                        canActivate: [(): boolean => permisoRuta(GuardRecursosHumanos.fondoDeAhoro)],
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/fondo-de-ahorro/fondo-de-ahorro.component').then(c => c.FondoDeAhorroComponent)
                    },
                    {
                        path: 'prestamos',
                        canActivate: [(): boolean => permisoRuta(GuardRecursosHumanos.fondoDeAhoro)],
                        loadComponent: () => import('@s-dirAdmonFinanzas/empleados/prestamos/prestamos.component').then(c => c.PrestamosComponent)
                    }
                ]
        }
    ];
