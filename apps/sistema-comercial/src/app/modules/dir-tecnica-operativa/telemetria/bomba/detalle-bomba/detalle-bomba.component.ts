import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-detalle-bomba',
    standalone: true,
    imports: [CommonModule, MatDividerModule, MatButtonModule],
    templateUrl: './detalle-bomba.component.html',
    styleUrls: ['./detalle-bomba.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleBombaComponent {}
