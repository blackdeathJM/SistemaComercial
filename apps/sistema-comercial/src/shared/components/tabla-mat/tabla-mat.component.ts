import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ITabla} from '@s-shared/components/tabla-mat/tabla-interface';
import {ValorColumnaPipe} from '@s-shared/components/tabla-mat/valor-columna.pipe';


@Component({
    selector: 'app-tabla-mat',
    standalone: true,
    imports: [CommonModule, MatTableModule, ValorColumnaPipe],
    templateUrl: './tabla-mat.component.html',
    styleUrls: ['./tabla-mat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaMatComponent
{
    origenDatos: MatTableDataSource<any>;
    columnasAMostrar: string[] = [];
    columnasTabla: ITabla[] = [];
    datosOrigen: any;

    @Input() set datos(data: MatTableDataSource<any>)
    {
        this.origenDatos = data;
    }

    @Input() set columnas(columnas: ITabla[])
    {
        this.columnasTabla = columnas;
        this.columnasAMostrar = this.columnas.map(col => col.def);
    }
}
