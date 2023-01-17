import {Routes} from '@angular/router';
import {EmpleadosComponent} from '@s-dirAdmonFinanzas/empleados/empleados.component';
import {InfoGralEmpleadoComponent} from '@s-dirAdmonFinanzas/empleados/info-gral-empleado/info-gral-empleado.component';
import {ImssComponent} from '@s-dirAdmonFinanzas/empleados/imss/imss.component';
import {NominaComponent} from '@s-dirAdmonFinanzas/empleados/nomina/nomina.component';
import {CtrlRetardosComponent} from '@s-dirAdmonFinanzas/empleados/ctrl-retardos/ctrl-retardos.component';
import {FondoDeAhorroComponent} from '@s-dirAdmonFinanzas/empleados/fondo-de-ahorro/fondo-de-ahorro.component';

export const empleadosRouting: Routes =
    [
        {
            path: '',
            component: EmpleadosComponent,
            children:
                [
                    {
                        path: 'info-general',
                        component: InfoGralEmpleadoComponent
                    },
                    {
                        path: 'imss',
                        component: ImssComponent
                    },
                    {
                        path: 'nomina',
                        component: NominaComponent
                    },
                    {
                        path: 'retardos',
                        component: CtrlRetardosComponent
                    },
                    {
                        path: 'fondo-de-ahorro',
                        component: FondoDeAhorroComponent
                    }
                ]
        }
    ];
