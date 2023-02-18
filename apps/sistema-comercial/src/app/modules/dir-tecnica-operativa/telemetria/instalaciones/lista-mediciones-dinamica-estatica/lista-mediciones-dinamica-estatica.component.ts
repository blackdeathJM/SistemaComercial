import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {fuseAnimations} from '@s-fuse/public-api';
import {IMedicion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/comun.interface';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-lista-mediciones-dinamica-estatica',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
    templateUrl: './lista-mediciones-dinamica-estatica.component.html',
    styleUrls: ['./lista-mediciones-dinamica-estatica.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaMedicionesDinamicaEstaticaComponent
{
    // @ViewChild(MatPaginator, {static: true}) paginador: MatPaginator;
    @Input() dataSource: MatTableDataSource<IMedicion>;
    @Output() fila = new EventEmitter<IMedicion>();
    columnasMostrar = ['ano', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', 'accion'];
    sub = new Subscription();

    enviarMedicion(fila): void
    {
        this.fila.emit(fila);
    }
}
