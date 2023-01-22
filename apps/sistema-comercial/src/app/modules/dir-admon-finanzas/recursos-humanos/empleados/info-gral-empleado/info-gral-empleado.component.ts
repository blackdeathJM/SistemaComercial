import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FuseCardModule} from '@s-fuse/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {fuseAnimations} from '@s-fuse/public-api';
import {MatDialog} from "@angular/material/dialog";
import {ModRegistroEmpleadoComponent} from "@s-dirAdmonFinanzas/empleados/mod-registro-empleado/mod-registro-empleado.component";

@Component({
    selector: 'app-info-gral-empleado',
    standalone: true,
    imports:
        [
            CommonModule,
            MatCardModule,
            MatButtonModule,
            FuseCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule
        ],
    templateUrl: './info-gral-empleado.component.html',
    styleUrls: ['./info-gral-empleado.component.scss'],
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoGralEmpleadoComponent
{
    constructor(private mdr: MatDialog)
    {
    }

    nvoEmpleado(): void
    {
        this.mdr.open(ModRegistroEmpleadoComponent, {data: null, width: '45%'});
    }
}