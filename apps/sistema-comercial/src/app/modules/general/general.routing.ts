import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GeneralComponent} from '@s-app/general/general.component';
import {MisResguardosComponent} from '@s-app/general/mis-resguardos/mis-resguardos.component';
import {OrdenesAtencionComponent} from '@s-app/general/ordenes-atencion/ordenes-atencion.component';
import {ListaDocumentosComponent} from '@s-app/general/mis-documentos/lista-documentos/lista-documentos.component';
import {DetalleDocumentosComponent} from '@s-app/general/mis-documentos/detalle-documentos/detalle-documentos.component';

const generalRouting: Routes =
    [
        {
            path: '',
            component: GeneralComponent,
            children:
                [
                    {
                        path: 'mis-documentos',
                        component: ListaDocumentosComponent,
                        children:
                            [
                                {
                                    path: '',
                                    component: DetalleDocumentosComponent
                                }
                            ]
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
