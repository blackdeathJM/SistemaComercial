import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sesion',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sesion.component.html',
    styleUrls: ['./sesion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SesionComponent {}
