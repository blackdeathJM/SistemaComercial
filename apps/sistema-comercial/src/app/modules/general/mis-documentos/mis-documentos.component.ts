import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DrawerComponent} from '@s-shared/plantillas/lista-detalle/drawer.component';
import {CommonModule} from '@angular/common';
import {DetalleDocumentosComponent} from '@s-general/detalle-documentos/detalle-documentos.component';
import {ModDocumentosComponent} from '@s-general/mod-documentos/mod-documentos.component';
import {ListaDocumentosComponent} from '@s-general/lista-documentos/lista-documentos.component';
import {DocConsultaComponent} from '@s-general/doc-consulta/doc-consulta.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    standalone: true,
    imports: [CommonModule, DrawerComponent, DetalleDocumentosComponent, ListaDocumentosComponent, DocConsultaComponent, MatButtonModule, MatIconModule],
    selector: 'app-mis-documentos',
    templateUrl: './mis-documentos.component.html',
    styleUrls: ['./mis-documentos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MisDocumentosComponent
{
    constructor(private dRef: MatDialog)
    {
    }

    nuevosDocs(): void
    {
        this.dRef.open(ModDocumentosComponent, {width: '40%', data: null, hasBackdrop: false});
    }
}
