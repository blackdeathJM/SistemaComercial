import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ListaMotoresComponent} from '@s-dir-tecnica-operativa/motor/lista-motores/lista-motores.component';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {DefaultValuePipeModule} from '@angular-ru/cdk/pipes';
import {fuseAnimations} from '@s-fuse/public-api';

@Component({
    selector: 'app-detalle-motor',
    standalone: true,
    imports: [CommonModule, MatDividerModule, MatCardModule, MatButtonModule, MatIconModule, ListaMotoresComponent, DefaultValuePipeModule],
    templateUrl: './detalle-motor.component.html',
    styleUrls: ['./detalle-motor.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleMotorComponent
{
    indice: number;

    constructor(public entityTelemetria: EntityTelemetria)
    {
    }

    indiceMotor(e: number): void
    {
        this.indice = e;
    }
}
