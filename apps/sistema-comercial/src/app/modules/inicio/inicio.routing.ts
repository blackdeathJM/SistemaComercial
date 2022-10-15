import {Route} from '@angular/router';
import {InicioComponent} from '@s-app/modules/inicio/inicio.component';

export const inicioRouting: Route[] =
    [
        {
            path: '',
            component: InicioComponent
        }
    ];
