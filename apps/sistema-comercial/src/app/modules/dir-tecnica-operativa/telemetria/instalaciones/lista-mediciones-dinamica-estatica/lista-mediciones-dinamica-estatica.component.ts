import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lista-mediciones-dinamica-estatica',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lista-mediciones-dinamica-estatica.component.html',
    styleUrls: ['./lista-mediciones-dinamica-estatica.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaMedicionesDinamicaEstaticaComponent {}
