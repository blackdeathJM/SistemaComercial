import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-detalle-motor',
    standalone: true,
    imports: [CommonModule, MatDividerModule, MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './detalle-motor.component.html',
    styleUrls: ['./detalle-motor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleMotorComponent
{
    nvoMotor(): void
    {

    }
}
