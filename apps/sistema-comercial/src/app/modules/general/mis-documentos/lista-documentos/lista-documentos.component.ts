import {ChangeDetectionStrategy, Component, InjectionToken, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseCardModule} from '@s-fuse/card';
import {EntityMisDocumentosStore} from '@s-general/store/entity-mis-documentos.store';
import {FuseAlertModule} from '@s-fuse/alert';
import {IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ConvertirTimestamUnixPipe} from '#/apps/sistema-comercial/src/app/pipes/convertir-timestam-unix.pipe';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {loaderMisDocs, MisDocumentosService} from '@s-general/store/mis-documentos.service';
import {SinDatosComponent} from '@s-shared/sin-datos/sin-datos.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

export const LISTA_DOCS_TOKEN = new InjectionToken<ListaDocumentosComponent>('lista-docs-token');

@Component({
    selector: 'app-lista-documentos',
    standalone: true,
    imports: [CommonModule, FuseCardModule, FuseAlertModule, MatTooltipModule, ConvertirTimestamUnixPipe, NgxUiLoaderModule, SinDatosComponent, MatIconModule, MatTableModule, MatSortModule],
    templateUrl: './lista-documentos.component.html',
    styleUrls: ['./lista-documentos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{provide: LISTA_DOCS_TOKEN, useExisting: ListaDocumentosComponent}]
})
export class ListaDocumentosComponent implements OnInit
{
    loaderListaDocs = loaderMisDocs;

    constructor(public entityMisDocumentos: EntityMisDocumentosStore, private misDocsService: MisDocumentosService)
    {
    }

    ngOnInit(): void
    {
        this.misDocsService.docUsuarioProceso('pendiente', false).subscribe();
    }

    trackByFn(index: number, item: any): any
    {
        return item._id || index;
    }

    seleccionarDoc(doc: IResolveDocumento): void
    {
        this.entityMisDocumentos.seleccionarDoc(doc);
        this.misDocsService.setPanel = true;
    }
}
