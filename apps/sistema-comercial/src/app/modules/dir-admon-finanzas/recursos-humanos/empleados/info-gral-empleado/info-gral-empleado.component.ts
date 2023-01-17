import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FuseCardModule} from '@s-fuse/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'app-info-gral-empleado',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, FuseCardModule, MatFormFieldModule, MatInputModule],
    templateUrl: './info-gral-empleado.component.html',
    styleUrls: ['./info-gral-empleado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoGralEmpleadoComponent {}
