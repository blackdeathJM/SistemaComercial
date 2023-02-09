import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-detalle-bomba',
    standalone: true,
    imports: [CommonModule, MatDividerModule, MatButtonModule, MatCardModule, MatIconModule],
    templateUrl: './detalle-bomba.component.html',
    styleUrls: ['./detalle-bomba.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleBombaComponent {}
