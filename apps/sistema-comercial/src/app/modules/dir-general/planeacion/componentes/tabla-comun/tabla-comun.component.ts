import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {TablaComunDataSource} from './tabla-comun-datasource';
import {NgIf} from "@angular/common";

export interface IDatosTablaComun
{
    idIndicador: string;
    dato: string;
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;

    idIndicadorAd: string;
    datoAd: string;
    trim1Ad: number;
    trim2Ad: number;
    trim3Ad: number;
    trim4Ad: number;

    trim1Ant: number;
    trim2Ant: number;
    trim3Ant: number;
    trim4Ant: number;
}

export type TColVisible =
    {
        trim1: boolean;
        trim1Ant: boolean;
        trim1Ad: boolean;

        trim2: boolean;
        trim2Ant: boolean;
        trim2Ad: boolean;

        trim3: boolean;
        trim3Ant: boolean;
        trim3Ad: boolean;

        trim4: boolean;
        trim4Ant: boolean;
        trim4Ad: boolean;
    };

@Component({
    selector: 'app-tabla-comun',
    templateUrl: './tabla-comun.component.html',
    styleUrls: ['./tabla-comun.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatTableModule, NgIf]
})
export class TablaComunComponent
{
    @Input({required: true}) set datos(v: IDatosTablaComun[])
    {
        this._datos = v;
    }

    @Input({required: true}) set colVisible(v: TColVisible)
    {
        this._colVisible = v;
    }

    _datos: IDatosTablaComun[] = [];
    _colVisible: TColVisible;
    dataSource: TablaComunDataSource;

    displayedColumns = ['idIndicador', 'dato', 'trim1', 'trim1Ant', 'trim1Ad', 'trim2', 'trim2Ant', 'trim2Ad', 'trim3', 'trim3Ant', 'trim3Ad', 'trim4', 'trim4Ant', 'trim4Ad'];
}
