import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {FuseConfirmationConfig, FuseConfirmationService} from '@s-fuse/confirmation';
import {confirmarFinalizarDoc, confirmarFolio} from '@s-app/general/mis-documentos/detalle-documentos/dialogConfirmacion';
import {MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ConvertirTimestamUnixPipe} from "@s-app/pipes/convertir-timestam-unix.pipe";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CommonModule} from "@angular/common";

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            ConvertirTimestamUnixPipe,
            MatTooltipModule

        ],
    selector: 'app-detalle-documentos',
    templateUrl: './detalle-documentos.component.html',
    styleUrls: ['./detalle-documentos.component.scss']
})
export class DetalleDocumentosComponent implements OnInit
{
    @Output() cerrarPanel = new EventEmitter<boolean>();
    _documento: IDocumento;
    confFolio: FuseConfirmationConfig = confirmarFolio;
    confFinalizarDoc: FuseConfirmationConfig = confirmarFinalizarDoc;

    constructor(private dRef: MatDialog, private confirmacionService: FuseConfirmationService)
    {
    }

    @Input() set documento(v: IDocumento)
    {
        this._documento = v;
    }

    ngOnInit(): void
    {
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

    finalizarDoc(_documento: IDocumento): void
    {
        this.confirmacionService.open(this.confFinalizarDoc).afterClosed().subscribe((res) =>
        {
            if (res === 'confirmed')
            {

            }
        });
    }
}
