import {Routes} from '@angular/router';
import {GeneralComponent} from '@s-app/general/general.component';
import {MisResguardosComponent} from '@s-app/general/mis-resguardos/mis-resguardos.component';
import {OrdenesAtencionComponent} from '@s-app/general/ordenes-atencion/ordenes-atencion.component';
import {MisDocumentosComponent} from '@s-app/general/mis-documentos/mis-documentos.component';

export const generalRouting: Routes =
    [
        {
            path: '',
            component: GeneralComponent,
            children:
                [
                    {
                        path: 'mis-documentos',
                        component: MisDocumentosComponent
                    },
                    {
                        path: 'mis-resguardos',
                        component: MisResguardosComponent
                    },
                    {
                        path: 'ordenes-atencion',
                        component: OrdenesAtencionComponent
                    }
                ]
        }
    ];
