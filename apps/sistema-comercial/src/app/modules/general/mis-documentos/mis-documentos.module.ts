import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MisDocumentosComponent} from './mis-documentos.component';
import {DetalleDocumentosComponent} from './detalle-documentos/detalle-documentos.component';
import {SharedModule} from '@s-shared/shared.module';
import {RouterLink, RouterLinkWithHref, RouterOutlet} from '@angular/router';
import {FuseCardModule} from '@s-fuse/card';
import { ModDocumentosComponent } from './mod-documentos/mod-documentos.component';
import {FileUploadModule} from "@iplab/ngx-file-upload";
import {PipesModule} from "@s-app/pipes/pipes.module";
import { ModFoliosComponent } from './mod-folios/mod-folios.component';

@NgModule({
    declarations:
        [
            MisDocumentosComponent,
            DetalleDocumentosComponent,
            ModDocumentosComponent,
            ModFoliosComponent
        ],
    imports:
        [
            CommonModule,
            SharedModule,
            RouterOutlet,
            RouterLinkWithHref,
            FuseCardModule,
            RouterLink,
            FileUploadModule,
            PipesModule,
        ],
    exports: [DetalleDocumentosComponent]
})
export class MisDocumentosModule
{
}
