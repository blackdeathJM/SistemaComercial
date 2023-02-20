import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {fuseAnimations} from '@s-fuse/public-api';
import {IMedicion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/comun.interface';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Meses} from '#/libs/models/src/lib/tecnica-operativa/telemetria/medicion';
import {toArray} from 'lodash-es';

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
    @Output() fila = new EventEmitter<[any, number]>();
    // columnasMostrar = ['ano', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', 'accion'];
    columnasMostrar = toArray(Meses);
    sub = new Subscription();

    enviarMedicion(fila: any, i: number): void
    {
        this.fila.emit([fila, i]);
    }
}
