import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ITabla} from '@s-shared/components/tabla-mat/tabla-interface';
import {ValorColumnaPipe} from '@s-shared/components/tabla-mat/valor-columna.pipe';
import {IformComun, IFormPlanta} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";


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

    _origenDatos: MatTableDataSource<IformComun[] | IFormPlanta[]>;

    columnasAMostrar: string[] = [];

    columnasTabla: ITabla[] = [];

    @Input({required: true}) set datos(data: MatTableDataSource<IformComun[] | IFormPlanta[]>)
    {
        this._origenDatos = data;
    }

    @Input({required: true}) set columnas(columnas: ITabla[])
    {
        this.columnasTabla = columnas;
        this.columnasAMostrar = this.columnas.map(col => col.def);
    }
}
