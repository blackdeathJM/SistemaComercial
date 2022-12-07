import {Routes} from '@angular/router';
import {DirTecnicaOperativaComponent} from './dir-tecnica-operativa.component';

export const dirTenicaOperativaRouting: Routes =
    [
        {
            path: '',
            component: DirTecnicaOperativaComponent,
            children:
                [
                    {
                        path: 'telemetria',
                        loadChildren: () => import('@s-dir-tecnica-operativa/telemetria.routing').then(t => t.telemetriaRouting)
                    }
                ]
        }
    ];
