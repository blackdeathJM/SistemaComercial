import {Component} from '@angular/core';
import {IDocumento} from '#/libs/models/src/lib/general/documentos/documentos.interface';
import {MatDialog} from '@angular/material/dialog';
import {ModDocumentosComponent} from '@s-app/general/mis-documentos/mod-documentos/mod-documentos.component';

@Component({
    selector: 'app-mis-documentos',
    templateUrl: './mis-documentos.component.html',
    styleUrls: ['./mis-documentos.component.scss']
})
export class MisDocumentosComponent
{
    docs: IDocumento[];
    docSeleccionado: IDocumento;
    abrirP: boolean = false;

    constructor(private dRef: MatDialog)
    {
    }

    seleccionarDoc(): void
    {
        // TODO: Asignar el documento seleccionando al input de los detalles
        // this.docSeleccionado = doc;
        this.abrirP = true;
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    cerrarP(evento: boolean): void
    {
        this.abrirP = evento;
    }

    nuevosDocs(): void
    {
        this.dRef.open(ModDocumentosComponent, {width: '40%', data: null});
    }
}
