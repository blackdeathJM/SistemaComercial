import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';

@Component({
    selector: 'app-detalle-motor',
    standalone: true,
    imports: [CommonModule, MatDividerModule],
    templateUrl: './detalle-motor.component.html',
    styleUrls: ['./detalle-motor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleMotorComponent {}
