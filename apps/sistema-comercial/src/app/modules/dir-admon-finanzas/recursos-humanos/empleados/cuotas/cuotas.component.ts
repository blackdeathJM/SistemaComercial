import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cuotas',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cuotas.component.html',
    styleUrls: ['./cuotas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuotasComponent {}
