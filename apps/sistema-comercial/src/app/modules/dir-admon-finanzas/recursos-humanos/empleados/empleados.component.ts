import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterLinkWithHref} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialog} from '@angular/material/dialog';
import {ModRegistroEmpleadoComponent} from '@s-dirAdmonFinanzas/empleados/mod-registro-empleado/mod-registro-empleado.component';

@Component({
    selector: 'app-empleados',
    standalone: true,
    imports: [CommonModule, MatIconModule, RouterLinkWithHref, MatButtonModule, MatTabsModule],
    templateUrl: './empleados.component.html',
    styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent
{
    constructor(private mdr: MatDialog)
    {
    }

    registroEmpleado(): void
    {
        this.mdr.open(ModRegistroEmpleadoComponent, {data: null, width: '45%'});
    }
}
