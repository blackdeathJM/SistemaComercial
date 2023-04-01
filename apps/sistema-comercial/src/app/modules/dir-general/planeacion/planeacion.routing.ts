import {Routes} from '@angular/router';
import {PlaneacionComponent} from '@s-dir-general/planeacion.component';
import MirComponent from '@s-dir-general/mir/mir.component';
import {PbrComponent} from '@s-dir-general/pbr/pbr.component';
import {AsigCentroGestorComponent} from '@s-dir-general/asig-centro-gestor/asig-centro-gestor.component';


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
                        path: 'asignacion-centro-gestor',
                        component: AsigCentroGestorComponent
                    }
                ]
        }
    ];
