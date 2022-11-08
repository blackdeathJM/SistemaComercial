import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IDocumento, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {FuseConfirmationConfig, FuseConfirmationService} from '@s-fuse/confirmation';
import {confirmarFinalizarDoc, confirmarFolio} from '@s-app/general/mis-documentos/detalle-documentos/dialogConfirmacion';
import {MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ConvertirTimestamUnixPipe} from '@s-app/pipes/convertir-timestam-unix.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModSubirDocsComponent} from '@s-app/general/mis-documentos/mod-subir-docs/mod-subir-docs.component';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            ConvertirTimestamUnixPipe,
            MatTooltipModule,
            ReactiveFormsModule

        ],
    selector: 'app-detalle-documentos',
    templateUrl: './detalle-documentos.component.html',
    styleUrls: ['./detalle-documentos.component.scss']
})
export class DetalleDocumentosComponent
{
    @Output() cerrarPanel = new EventEmitter<boolean>();
    _documento: IResolveDocumento;
    confFolio: FuseConfirmationConfig = confirmarFolio;
    confFinalizarDoc: FuseConfirmationConfig = confirmarFinalizarDoc;

    constructor(private dRef: MatDialog, private confirmacionService: FuseConfirmationService, private mdr: MatDialog)
    {
    }

    @Input() set documento(v: IResolveDocumento)
    {
        this._documento = v;
    }

    cerrarP(): void
    {
        this.cerrarPanel.emit(false);
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    abrirLink(url: string): void
    {
        if (url)
        {
            window.open(url, '_blank');
        }
    }

    generarFolio(_documento: IDocumento): void
    {
        this.confirmacionService.open(this.confFolio).afterClosed().subscribe((res) =>
        {
            if (res === 'confirmed')
            {

            }
        });
    }

    finalizarDoc(_documento: IResolveDocumento): void
    {
        this.confirmacionService.open(this.confFinalizarDoc).afterClosed().subscribe((res) =>
        {
            if (res === 'confirmed')
            {

            }
        });
    }

    reasignacion(): void
    {

    }

    modDocs(data: IResolveDocumento): void
    {
        this.mdr.open(ModSubirDocsComponent, {width: '40%', data});
    }
}
