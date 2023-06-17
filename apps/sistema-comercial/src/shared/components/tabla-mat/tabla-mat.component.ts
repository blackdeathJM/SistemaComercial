import {ChangeDetectionStrategy, Component, Input, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {IGenerarColumnTabla} from '#/libs/models/src/lib/tabla.interface';
import {isNotNil} from '@angular-ru/cdk/utils';
import {MultiplesFormatosPipe} from "@s-shared/pipes/multiples-formatos.pipe";

export const colTablaDin: WritableSignal<IGenerarColumnTabla[]> = signal<IGenerarColumnTabla[]>([]);

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
    @Input({required: true}) set datos(data: any[])
    {
        this._origenDatos = data;
    }

    @Input({required: true}) set columnas(columnas: IGenerarColumnTabla[])
    {
        console.log('En la tabla', columnas);
        this.columnasTabla = columnas;
        this.columnasAMostrar = this.columnasTabla.map(col => col.def);
    }

    _origenDatos: any[];
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
            return this._origenDatos.map(value => value[trim]).reduce((acc, act) => acc + act, 0);
        }
        return '----';
    }
}
