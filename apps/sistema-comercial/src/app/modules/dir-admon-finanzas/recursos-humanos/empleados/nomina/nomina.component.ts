import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-nomina',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nomina.component.html',
    styleUrls: ['./nomina.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NominaComponent {}
