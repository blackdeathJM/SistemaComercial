import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {ITabla} from '#/libs/models/src/lib/tabla.interface';
import {isNotNil} from '@angular-ru/cdk/utils';
import {MultiplesFormatosPipe} from "@s-shared/pipes/multiples-formatos.pipe";

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
    _origenDatos: any[];
    columnasAMostrar: string[] = [];
    columnasTabla: ITabla[] = [];

    @Input({required: true}) set datos(data: any[])
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
            if (isNaN(Number(trim)))
            {
                return '--';
            }
            return this._origenDatos.map(value => value[trim]).reduce((acc, act) => acc + act, 0);
        }
        return '----';
    }
}
