import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ITabla} from '@s-shared/components/tabla-mat/tabla-interface';
import {ValorColumnaPipe} from '@s-shared/components/tabla-mat/valor-columna.pipe';
import {IformComun, IFormPlanta} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {MatTableModule} from "@angular/material/table";


@Component({
    selector: 'app-tabla-mat',
    standalone: true,
    imports: [CommonModule, MatTableModule, ValorColumnaPipe, MatTableModule],
    templateUrl: './tabla-mat.component.html',
    styleUrls: ['./tabla-mat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaMatComponent
{

    _origenDatos: IformComun[] | IFormPlanta[] = [];

    columnasAMostrar: string[] = [];

    columnasTabla: ITabla[] = [];

    @Input({required: true}) set datos(data: IformComun[] | IFormPlanta[])
    {
        this._origenDatos = data;
    }

    @Input({required: true}) set columnas(columnas: ITabla[])
    {
        this.columnasTabla = columnas;
        this.columnasAMostrar = this.columnasTabla.map(col => col.def);
    }
}
