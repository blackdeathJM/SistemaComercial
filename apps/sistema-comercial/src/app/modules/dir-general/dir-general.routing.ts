import {Routes} from '@angular/router';
import {DirGeneralComponent} from '@s-dir-general/dir-general.component';
import {planeacionGuard} from "@s-dir-general/guards/planeacion.guard";

export const dirGeneralRouting: Routes =
    [
        {
            path: '',
            component: DirGeneralComponent,
            children:
                [
                    {
                        path: 'planeacion',
                        canActivate: [planeacionGuard],
                        loadChildren: () => import('@s-dir-general/planeacion.routing').then(p => p.planeacionRouting)
                    }
                ]
        }
    ];
