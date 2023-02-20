import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ListaMotoresComponent} from '@s-dir-tecnica-operativa/motor/lista-motores/lista-motores.component';
import {CtrlTelemetria} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-tecnica-operativa/telemetria';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';
import {MatDialog} from '@angular/material/dialog';
import {ModMotorComponent} from '@s-dir-tecnica-operativa/motor/mod-motor/mod-motor.component';
import {ListaMedicionesDinamicaEstaticaComponent} from '@s-dir-tecnica-operativa/instalaciones/lista-mediciones-dinamica-estatica/lista-mediciones-dinamica-estatica.component';

@Component({
    selector: 'app-detalle-motor',
    standalone: true,
    imports: [CommonModule, MatDividerModule, MatCardModule, MatButtonModule, MatIconModule, ListaMotoresComponent, NavegacionPipe, ListaMedicionesDinamicaEstaticaComponent],
    templateUrl: './detalle-motor.component.html',
    styleUrls: ['./detalle-motor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleMotorComponent
{
    agregarMotor: CtrlTelemetria.ctrlAgregarMotor;
    editarMotor: CtrlTelemetria.ctrlEditarMotor;

    constructor(private mdr: MatDialog)
    {
    }

    nvoMotor(): void
    {
        this.mdr.open(ModMotorComponent, {width: '40%', data: false, hasBackdrop: false});
    }
}
