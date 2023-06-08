import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValorColumnaPipe} from '@s-shared/components/tabla-mat/valor-columna.pipe';
import {IFormComun, IFormPlanta} from '#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface';
import {MatTableModule} from '@angular/material/table';
import {ComponentesPipe} from '@s-dir-general/componentes/componentes.pipe';
import {IDatosTablaComun, ITabla} from '#/libs/models/src/lib/tabla.interface';
import {isNotNil} from '@angular-ru/cdk/utils';

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
    _origenDatos: IDatosTablaComun[];
    columnasAMostrar: string[] = [];
    columnasTabla: ITabla[] = [];

    @Input({required: true}) set datos(data: IDatosTablaComun[])
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
        if(isNotNil(trim))
        {
            if(trim === 'idIndicador')
            {
                return '';
            }

            if(trim === 'dato')
            {
                return 'Total';
            }
            return this._origenDatos.map(value => value[trim]).reduce((acc, act) => acc + act, 0);
        }
        return '----';
    }
}
