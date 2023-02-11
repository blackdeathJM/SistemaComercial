import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-puesto-empleado',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './puesto-empleado.component.html',
    styleUrls: ['./puesto-empleado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuestoEmpleadoComponent {}
