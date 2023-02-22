import {Routes} from '@angular/router';
import {PlaneacionComponent} from '@s-dir-general/planeacion.component';

export const planeacionRouting: Routes =
    [
        {
            path: '',
            component: PlaneacionComponent,
            children:
                [
                    {
                        path: 'mir',
                        loadComponent: () => import('@s-dir-general/planeacion/mir/mir.component')
                    }
                ]
        }
    ];
