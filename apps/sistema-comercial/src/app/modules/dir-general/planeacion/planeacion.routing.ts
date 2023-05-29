import {Routes} from '@angular/router';

export const planeacionRouting: Routes =
    [
        {
            path: '',
            loadComponent: () => import('@s-dir-general/planeacion.component').then(c => c.PlaneacionComponent),
            children:
                [
                    {
                        path: 'mir',
                        loadComponent: () => import('@s-dir-general/mir/mir.component')
                    },
                    {
                        path: 'avance-de-actividades',
                        loadComponent: () => import('@s-dir-general/pbr/pbr.component').then(c => c.PbrComponent)
                    }
                ]
        }
    ];
