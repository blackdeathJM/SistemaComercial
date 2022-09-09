import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MisDocumentosComponent} from './mis-documentos.component';
import {DetalleDocumentosComponent} from './detalle-documentos/detalle-documentos.component';
import {SharedModule} from '@s-shared/shared.module';
import {RouterLink, RouterLinkWithHref, RouterOutlet} from '@angular/router';
import {FuseCardModule} from '@s-fuse/card';
import { ModDocumentosComponent } from './mod-documentos/mod-documentos.component';

@NgModule({
    declarations:
        [
            MisDocumentosComponent,
            DetalleDocumentosComponent,
            ModDocumentosComponent
        ],
    imports:
        [
            CommonModule,
            SharedModule,
            RouterOutlet,
            RouterLinkWithHref,
            FuseCardModule,
            RouterLink,
        ],
    exports: [DetalleDocumentosComponent]
})
export class MisDocumentosModule
{
}
