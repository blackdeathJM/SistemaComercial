import {Routes} from '@angular/router';
import {GeneralComponent} from '@s-general/general.component';
import {MisDocumentosComponent} from '@s-general/mis-documentos.component';
import {MisResguardosComponent} from '@s-general/mis-resguardos.component';
import {OrdenesAtencionComponent} from '@s-general/ordenes-atencion.component';
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
