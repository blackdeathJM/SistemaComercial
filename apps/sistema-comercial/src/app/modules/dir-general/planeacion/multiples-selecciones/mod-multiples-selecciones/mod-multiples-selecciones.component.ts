import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mod-multiples-selecciones',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mod-multiples-selecciones.component.html',
    styleUrls: ['./mod-multiples-selecciones.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModMultiplesSeleccionesComponent {}
