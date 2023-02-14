import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';
import {CtrlTelemetria} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-tecnica-operativa/telemetria';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-detalle-instalacion',
    standalone: true,
    imports: [CommonModule, MatDividerModule, MatCardModule, MatButtonModule, MatIconModule, NavegacionPipe],
    templateUrl: './detalle-instalacion.component.html',
    styleUrls: ['./detalle-instalacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleInstalacionComponent
{
    ctrlNvaInstalacion: CtrlTelemetria.ctrlNvaInstalacion;
    constructor(private mdf: MatDialog, )
    {
    }
    nvaInstalacion(): void
    {
    }
}
