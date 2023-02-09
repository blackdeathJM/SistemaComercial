import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {FuseCardModule} from '@s-fuse/card';

@Component({
    selector: 'app-consulta-empleado',
    standalone: true,
    imports: [CommonModule, MatInputModule, FuseCardModule],
    templateUrl: './consulta-empleado.component.html',
    styleUrls: ['./consulta-empleado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultaEmpleadoComponent
{}
