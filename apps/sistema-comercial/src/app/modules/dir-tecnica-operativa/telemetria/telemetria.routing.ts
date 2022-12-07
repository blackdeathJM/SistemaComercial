import {Routes} from '@angular/router';
import {InstalacionesComponent} from '#/apps/sistema-comercial/src/app/modules/dir-tecnica-operativa/telemetria/instalaciones/instalaciones.component';

export const telemetriaRouting: Routes =
    [
        {
            path: 'instalaciones',
            component: InstalacionesComponent
        }
    ];
