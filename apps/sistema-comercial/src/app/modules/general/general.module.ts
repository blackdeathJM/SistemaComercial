import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralComponent} from './general.component';
import {MisDocumentosModule} from './mis-documentos/mis-documentos.module';
import {MisResguardosModule} from './mis-resguardos/mis-resguardos.module';
import {OrdenesAtencionModule} from './ordenes-atencion/ordenes-atencion.module';
import {GeneralRouting} from '@s-app/general/general.routing';


@NgModule({
    declarations:
        [
            GeneralComponent
        ],
    imports:
        [
            CommonModule,
            GeneralRouting,
            MisDocumentosModule,
            MisResguardosModule,
            OrdenesAtencionModule
        ]
})
export class GeneralModule
{
}
