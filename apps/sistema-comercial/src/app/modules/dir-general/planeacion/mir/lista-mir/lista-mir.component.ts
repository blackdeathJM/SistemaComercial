import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'app-lista-mir',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatTooltipModule, MatListModule, MatInputModule],
    templateUrl: './lista-mir.component.html',
    styleUrls: ['./lista-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaMirComponent
{
    colMostrarPrimer = ['idIdentificador', 'ano', 'nivel', 'programaFinanciacion', 'resumenNarrativo', 'nombreDelIndicador', 'tipo', 'dimension'];
    colMostrar = ['idIdentificador', 'metodoCalculo', 'metodoDeVerificacion', 'supuestos', 'unidadDeMedida', 'frecuenciaMedicion', 'sentidoDelIndicador'];
    colMostrarAcc = ['idIdentificador', 'centroGestor', 'lineaBaseAno', 'LineaBaseValor', 'meta', 'semefVerde', 'semefAmarillo', 'semefRojo', 'avanceTrim1', 'avanceTrim2', 'avanceTrim3',
        'avanceTrim4', 'avanceAnual'];
    dataSource: MatTableDataSource<any>;
}
