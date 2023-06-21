import {Routes} from '@angular/router';
import {PlaneacionComponent} from "@s-dir-general/planeacion.component";

export const planeacionRouting: Routes =
    [
        {
            path: '',
            component: PlaneacionComponent,
            children:
                [
                    {
                        path: 'mir',
                        loadComponent: () => import('@s-dir-general/mir/mir.component')
                    },
                    {
                        path: 'avance-de-actividades',
                        loadComponent: () => import('@s-dir-general/pbr/pbr.component').then(c => c.PbrComponent)
                    },
                    {
                        path: 'mir/registro-componente/:_id/:idMir',
                        loadComponent: () => import('@s-dir-general/planeacion/componentes/mod-componentes/mod-comp-dinamico/mod-comp-dinamico.component').then(c => c.ModCompDinamicoComponent)
                    }
                ]
        }
    ];
