import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-multiples-selecciones',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './multiples-selecciones.component.html',
    styleUrls: ['./multiples-selecciones.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiplesSeleccionesComponent {}
