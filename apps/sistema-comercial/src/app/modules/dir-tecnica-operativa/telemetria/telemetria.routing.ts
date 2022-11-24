import {Routes} from '@angular/router';
import {InstalacionesComponent} from '@s-app/dir-tecnica-operativa/telemetria/instalaciones/instalaciones.component';

export const telemetriaRouting: Routes =
    [
        {
            path: 'instalaciones',
            component: InstalacionesComponent
        }
    ];
