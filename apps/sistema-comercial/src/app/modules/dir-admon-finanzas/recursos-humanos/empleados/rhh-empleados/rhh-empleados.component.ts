import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-rhh-empleados',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './rhh-empleados.component.html',
    styleUrls: ['./rhh-empleados.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RhhEmpleadosComponent {}
