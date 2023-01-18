import {Routes} from '@angular/router';
import {TelemetriaComponent} from '@s-dir-tecnica-operativa/telemetria.component';

export const telemetriaRouting: Routes =
    [
        {
            path: '',
            component: TelemetriaComponent,
            children:
                [
                    {
                        path: 'instalaciones',
                        loadComponent: () => import('@s-dir-tecnica-operativa/telemetria/instalaciones/instalaciones.component').then(c => c.InstalacionesComponent)
                    },
                    {
                        path: 'bombas',
                        loadComponent: () => import('@s-dir-tecnica-operativa/telemetria/bomba/detalle-bomba/detalle-bomba.component').then(c => c.DetalleBombaComponent)
                    },
                    {
                        path: 'motores',
                        loadComponent: () => import('@s-dir-tecnica-operativa/telemetria/motor/detalle-motor/detalle-motor.component').then(c => c.DetalleMotorComponent)
                    },
                    {
                        path: 'cfe',
                        loadComponent: () => import('@s-dir-tecnica-operativa/telemetria/cfe-telemetria/detalle-cfe/cfe-telemetria.component').then(c => c.CfeTelemetriaComponent)
                    }
                ]
        }
    ];
