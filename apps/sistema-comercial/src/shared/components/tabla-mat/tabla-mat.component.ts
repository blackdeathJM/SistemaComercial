import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {IGenerarColumnTabla} from '#/libs/models/src/lib/tabla.interface';
import {isNotNil} from '@angular-ru/cdk/utils';
import {MultiplesFormatosPipe} from "@s-shared/pipes/multiples-formatos.pipe";
import {isNumber} from "lodash-es";
import {KeysOfType, PlainObject, PlainObjectOf, PrimaryKey} from "@angular-ru/cdk/typings";
import {generateQuickGuid} from "@angular-ru/cdk/string";

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

    @Input({required: true}) obtenerValor: boolean = false;

    @Output() valorFila = new EventEmitter<any>();
    _origenDatos = new MatTableDataSource([]);
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

    emitiValorCelda<T>(fila: T): void
    {
        const id: string = PrimaryKey[Symbol.hasInstance];
        const uudi = generateQuickGuid().toUpperCase();


        type tipos = KeysOfType<IGenerarColumnTabla, string | number | boolean>;
        const a: PlainObject = {a: 1, b: '2A'};
        const b: PlainObjectOf<number> = {a: 1, b: 2};
        console.log('generar id', id);
        console.log('plaint bo', a, b);
        console.log(uudi);
        console.log(fila);
    }
}
