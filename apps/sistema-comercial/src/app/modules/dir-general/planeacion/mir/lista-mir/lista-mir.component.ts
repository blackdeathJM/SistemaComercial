import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MirService} from '@s-dir-general/mir/store/mir.service';
import {EntityMir} from '@s-dir-general/mir/store/mir.entity';
import {MirType} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-lista-mir',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatTooltipModule, MatListModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule],
    providers: [MirService],
    templateUrl: './lista-mir.component.html',
    styleUrls: ['./lista-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaMirComponent implements OnInit
{
    colMostrarPrimer = ['idIndicador', 'ano', 'nivel', 'programaFinanciacion', 'resumenNarrativo', 'nombreDelIndicador', 'tipo', 'dimension'];
    colMostrar = ['idIndicador', 'metodoCalculo', 'mediosDeVerificacion', 'supuestos', 'unidadDeMedida', 'frecuenciaMedicion', 'sentidoDelIndicador'];
    colMostrarAcc = ['idIndicador', 'centroGestor', 'lineaBaseAno', 'LineaBaseValor', 'meta', 'semefVerde', 'semefAmarillo', 'semefRojo', 'avanceTrim1', 'avanceTrim2', 'avanceTrim3',
        'avanceTrim4', 'avanceAnual'];
    dataSource = new MatTableDataSource<MirType>([]);

    constructor(private entityMir: EntityMir)
    {
    }

    ngOnInit(): void
    {
        this.entityMir.entitiesArray$.subscribe((res) =>
        {
            this.dataSource.data = res;
        });
    }
}
