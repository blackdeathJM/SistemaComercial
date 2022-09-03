import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MisDocumentosComponent} from './mis-documentos.component';
import { ListaDocumentosComponent } from './lista-documentos/lista-documentos.component';
import { DetalleDocumentosComponent } from './detalle-documentos/detalle-documentos.component';
import {SharedModule} from "@s-shared/shared.module";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {PlantillasModule} from "@s-shared/plantillas/plantillas.module";

@NgModule({
    declarations:
        [
            MisDocumentosComponent,
            ListaDocumentosComponent,
            DetalleDocumentosComponent
        ],
    imports:
        [
            CommonModule,
            SharedModule,
            RouterOutlet,
            RouterLinkWithHref,
            PlantillasModule
        ]
})
export class MisDocumentosModule
{
}
