import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-info-gral-empleado',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './info-gral-empleado.component.html',
    styleUrls: ['./info-gral-empleado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoGralEmpleadoComponent {}
