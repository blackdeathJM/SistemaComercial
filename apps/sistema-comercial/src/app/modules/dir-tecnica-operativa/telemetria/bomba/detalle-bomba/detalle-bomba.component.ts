import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';

@Component({
    selector: 'app-detalle-bomba',
    standalone: true,
    imports: [CommonModule, MatDividerModule],
    templateUrl: './detalle-bomba.component.html',
    styleUrls: ['./detalle-bomba.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleBombaComponent {}
