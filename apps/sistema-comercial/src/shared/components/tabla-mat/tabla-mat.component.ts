import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {IGenerarColumnTabla} from '#/libs/models/src/lib/tabla.interface';
import {MultiplesFormatosPipe} from "@s-shared/pipes/multiples-formatos.pipe";
import {MatTooltipModule} from "@angular/material/tooltip";
import {isNotNil} from "@angular-ru/cdk/utils";
import {isNumber} from "lodash-es";

@Component({
    selector: 'app-tabla-mat',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatTableModule, MultiplesFormatosPipe, MatTooltipModule],
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

    @Input({required: true}) obtenerValor: boolean = false;

    @Output() valorFila = new EventEmitter<any>();

    _origenDatos = new MatTableDataSource([]);
    columnasAMostrar: string[] = [];
    columnasTabla: IGenerarColumnTabla[] = [];
    celdaSeleccionada = false;

    obtenerTotal(def: string): string | number
    {
        if (isNotNil(def))
        {
            return this._origenDatos.data.map(value =>
            {
                if (isNumber(parseInt(value[def])))
                {
                    return parseFloat(value[def]);
                }
                return 0;
            }).reduce((acc, act) => acc + act, 0);
        }
        return '----';
    }

    dblEmitiValorCelda(fila: any): void
    {
        this.celdaSeleccionada = !this.celdaSeleccionada;
        this.valorFila.emit(fila);
    }
}
