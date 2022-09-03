import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MisDocumentosComponent} from './mis-documentos.component';
import {DetalleDocumentosComponent} from './detalle-documentos/detalle-documentos.component';
import {SharedModule} from '@s-shared/shared.module';
import {RouterLinkWithHref, RouterOutlet} from '@angular/router';
import {FuseCardModule} from '@s-fuse/card';

@NgModule({
    declarations:
        [
            MisDocumentosComponent,
            DetalleDocumentosComponent
        ],
    imports:
        [
            CommonModule,
            SharedModule,
            RouterOutlet,
            RouterLinkWithHref,
            FuseCardModule,
        ],
    exports: [DetalleDocumentosComponent]
})
export class MisDocumentosModule
{
}
