import {Routes} from '@angular/router';
import {DirTecnicaOperativaComponent} from '@s-app/dir-tecnica-operativa/dir-tecnica-operativa.component';
import {TelemetriaComponent} from '@s-app/dir-tecnica-operativa/telemetria/telemetria.component';

export const dirTenicaOperativaRouting: Routes =
    [
        {
            path: '',
            component: DirTecnicaOperativaComponent,
            children:
                [
                    {
                        path: 'telemetria',
                        component: TelemetriaComponent
                    }
                ]
        }
    ];
