import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-avance-actividades-pbr',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './avance-actividades-pbr.component.html',
    styleUrls: ['./avance-actividades-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvanceActividadesPbrComponent {}
