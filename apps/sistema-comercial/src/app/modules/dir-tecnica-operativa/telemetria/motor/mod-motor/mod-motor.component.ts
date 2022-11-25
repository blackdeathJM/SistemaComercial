import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mod-motor',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mod-motor.component.html',
    styleUrls: ['./mod-motor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModMotorComponent {}
