import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDocumento} from '#/libs/models/src/lib/general/documentos/documentos.interface';

@Component({
    selector: 'app-detalle-documentos',
    templateUrl: './detalle-documentos.component.html',
    styleUrls: ['./detalle-documentos.component.scss']
})
export class DetalleDocumentosComponent implements OnInit
{
    @Output() cerrarPanel = new EventEmitter<boolean>();
    _documento: IDocumento;

    constructor()
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
}
