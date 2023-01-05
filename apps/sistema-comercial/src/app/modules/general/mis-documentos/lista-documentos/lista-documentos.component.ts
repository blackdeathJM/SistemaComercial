import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseCardModule} from '@s-fuse/card';
import {EntityMisDocumentosStore} from '@s-general/entity-mis-documentos.store';
import {FuseAlertModule} from '@s-fuse/alert';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ConvertirTimestamUnixPipe} from '#/apps/sistema-comercial/src/app/pipes/convertir-timestam-unix.pipe';
import {STATE_ABRIR_CERRAR_PANEL} from "@s-general/variables-docs.state";

@Component({
    selector: 'app-lista-documentos',
    standalone: true,
    imports: [CommonModule, FuseCardModule, FuseAlertModule, TailwindLoadingComponent, MatTooltipModule, ConvertirTimestamUnixPipe],
    templateUrl: './lista-documentos.component.html',
    styleUrls: ['./lista-documentos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaDocumentosComponent implements OnInit
{
    constructor(public entityMisDocumentos: EntityMisDocumentosStore)
    {
    }

    ngOnInit(): void
    {
        this.entityMisDocumentos.cargarDocsPorProceso('pendiente', false);
    }

    trackByFn(index: number, item: any): any
    {
        return item._id || index;
    }

    seleccionarDoc(doc: IResolveDocumento): void
    {
        this.entityMisDocumentos.seleccionarDoc(doc);
        STATE_ABRIR_CERRAR_PANEL(true);
    }
}
