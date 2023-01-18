import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cfe-telemetria',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cfe-telemetria.component.html',
    styleUrls: ['./cfe-telemetria.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CfeTelemetriaComponent {}
