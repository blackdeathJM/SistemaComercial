import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tarjeta-mat',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tarjeta-mat.component.html',
    styleUrls: ['./tarjeta-mat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaMatComponent {}
