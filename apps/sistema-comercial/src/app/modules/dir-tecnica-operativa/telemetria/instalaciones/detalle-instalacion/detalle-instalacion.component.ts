import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';
import {CtrlTelemetria} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-tecnica-operativa/telemetria';
import {MatDialog} from '@angular/material/dialog';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {ModInstalacionComponent} from '@s-dir-tecnica-operativa/instalaciones/mod-instalacion/mod-instalacion.component';

@Component({
    selector: 'app-detalle-instalacion',
    standalone: true,
    imports: [CommonModule, MatDividerModule, MatCardModule, MatButtonModule, MatIconModule, NavegacionPipe],
    templateUrl: './detalle-instalacion.component.html',
    styleUrls: ['./detalle-instalacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleInstalacionComponent implements OnInit
{
    ctrlNvaInstalacion: CtrlTelemetria.ctrlNvaInstalacion;

    constructor(private mdf: MatDialog, private entityTelemetria: EntityTelemetria)
    {
    }

    ngOnInit(): void
    {
    }

    nvaInstalacion(): void
    {
        this.entityTelemetria.patchState({instalacion: null});
        this.mdf.open(ModInstalacionComponent, {width: '40%', hasBackdrop: false});
    }
}
