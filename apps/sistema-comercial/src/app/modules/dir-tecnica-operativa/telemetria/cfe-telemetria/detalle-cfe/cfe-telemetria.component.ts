import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-cfe-telemetria',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './cfe-telemetria.component.html',
    styleUrls: ['./cfe-telemetria.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CfeTelemetriaComponent {}
