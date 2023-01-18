import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'app-detalle-instalacion',
    standalone: true,
    imports: [CommonModule, MatDividerModule, MatCardModule],
    templateUrl: './detalle-instalacion.component.html',
    styleUrls: ['./detalle-instalacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleInstalacionComponent {}
