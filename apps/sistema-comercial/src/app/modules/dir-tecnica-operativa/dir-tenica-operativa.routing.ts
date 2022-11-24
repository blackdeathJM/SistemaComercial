import {Routes} from '@angular/router';
import {DirTecnicaOperativaComponent} from '@s-app/dir-tecnica-operativa/dir-tecnica-operativa.component';

export const dirTenicaOperativaRouting: Routes =
    [
        {
            path: '',
            component: DirTecnicaOperativaComponent,
            children:
                [
                    {
                        path: 'telemetria',
                        loadChildren: () => import('@s-app/dir-tecnica-operativa/telemetria/telemetria.routing').then(t => t.telemetriaRouting)
                    }
                ]
        }
    ];
