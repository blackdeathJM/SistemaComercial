import {Routes} from '@angular/router';
import {PlaneacionComponent} from '@s-dir-general/planeacion.component';
import MirComponent from '@s-dir-general/mir/mir.component';
import {PbrComponent} from '@s-dir-general/pbr/pbr.component';
import {ComponentesComponent} from "@s-dir-general/componentes/componentes.component";


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
                        path: 'pbr',
                        component: PbrComponent
                    },
                    {
                        path: 'componentes',
                        component: ComponentesComponent
                    }
                ]
        }
    ];
