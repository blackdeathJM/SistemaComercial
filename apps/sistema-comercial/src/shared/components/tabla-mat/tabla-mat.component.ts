import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {IGenerarColumnTabla} from '#/libs/models/src/lib/tabla.interface';
import {isNotNil} from '@angular-ru/cdk/utils';
import {MultiplesFormatosPipe} from "@s-shared/pipes/multiples-formatos.pipe";
import {isNumber} from "lodash-es";

@Component({
    selector: 'app-tabla-mat',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatTableModule, MultiplesFormatosPipe],
    templateUrl: './tabla-mat.component.html',
    styleUrls: ['./tabla-mat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaMatComponent
{
    @Input({required: true}) set datos(data: MatTableDataSource<any>)
    {
        this._origenDatos = data;
    }

    @Input({required: true}) set columnas(columnas: IGenerarColumnTabla[])
    {
        this.columnasTabla = columnas;
        this.columnasAMostrar = this.columnasTabla.map(col => col.def);
    }

    _origenDatos = new MatTableDataSource<any>([]);
    columnasAMostrar: string[] = [];
    columnasTabla: IGenerarColumnTabla[] = [];

    obtenerTotal(trim: string): string
    {
        if (isNotNil(trim))
        {
            if (trim === 'idIndicador')
            {
                return '';
            }
            if (trim === 'dato')
            {
                return 'Total';
            }
            if (!isNumber(trim))
            {
                return '----'
            }
            return this._origenDatos.data.map(value => value[trim]).reduce((acc, act) => acc + act, 0);
        }
        return '----';
    }
}
