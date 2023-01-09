import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-consulta',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './consulta.component.html',
    styleUrls: ['./consulta.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultaComponent {}
