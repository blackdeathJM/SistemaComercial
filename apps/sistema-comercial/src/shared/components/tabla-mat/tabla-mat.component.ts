import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ITabla} from '@s-shared/components/tabla-mat/tabla-interface';
import {ValorColumnaPipe} from '@s-shared/components/tabla-mat/valor-columna.pipe';
import {IformComun, IFormPlanta} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {MatTableModule} from "@angular/material/table";
import {ComponentesPipe} from "@s-dir-general/componentes/componentes.pipe";

@Component({
    selector: 'app-tabla-mat',
    standalone: true,
    imports: [CommonModule, MatTableModule, ValorColumnaPipe, MatTableModule, ComponentesPipe],
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

    obtenerTotal(trim: string): string
    {
        if (trim === 'idIndicador')
        {
            return '';
        }
        if (trim === 'dato')
        {
            return 'Total';
        }
        console.log(isNaN(Number(trim)));
        const res = this._origenDatos.map(value => value[trim]).reduce((acc, act) => acc + act, 0);
        return res.toFixed(2);
    }
}
