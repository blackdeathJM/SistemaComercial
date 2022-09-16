import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GeneralComponent} from '@s-app/general/general.component';
import {MisResguardosComponent} from '@s-app/general/mis-resguardos/mis-resguardos.component';
import {OrdenesAtencionComponent} from '@s-app/general/ordenes-atencion/ordenes-atencion.component';
import {MisDocumentosComponent} from '@s-app/general/mis-documentos/mis-documentos.component';
import {DocsResolver} from '@s-app/general/mis-documentos/docs.resolver';

const generalRouting: Routes =
    [
        {
            path: '',
            component: GeneralComponent,
            children:
                [
                    {
                        path: 'mis-documentos',
                        resolve: {
                            documentos: DocsResolver,
                        },
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

@NgModule({
    imports: [RouterModule.forChild(generalRouting)],
    exports: [RouterModule]
})
export class GeneralRouting
{
}
