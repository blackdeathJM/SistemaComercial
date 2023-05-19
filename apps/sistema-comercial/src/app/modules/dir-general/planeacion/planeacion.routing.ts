import {Routes} from '@angular/router';
import {PlaneacionComponent} from '@s-dir-general/planeacion.component';
import MirComponent from '@s-dir-general/mir/mir.component';
import {PbrComponent} from "@s-dir-general/pbr/pbr.component";

export const planeacionRouting: Routes =
    [
        {
            path: '',
            component: PlaneacionComponent,
            children:
                [
                    {
                        path: 'mir',
                        component: MirComponent
                    },
                    {
                        path: 'avance-de-actividades',
                        component: PbrComponent
                    }
                ]
        }
    ];
