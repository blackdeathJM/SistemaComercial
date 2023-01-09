import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-fondo-de-ahorro',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './fondo-de-ahorro.component.html',
    styleUrls: ['./fondo-de-ahorro.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FondoDeAhorroComponent {}
