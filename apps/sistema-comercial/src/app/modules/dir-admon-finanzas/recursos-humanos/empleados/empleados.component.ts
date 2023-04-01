import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {fuseAnimations} from '@s-fuse/public-api';
import {ListaEmpleadosComponent} from '@s-dirAdmonFinanzas/empleados/lista-empleados/lista-empleados.component';


@Component({
    selector: 'app-empleados',
    standalone: true,
    imports:
        [
            CommonModule,
            RouterOutlet,
            ListaEmpleadosComponent,
        ],
    templateUrl: './empleados.component.html',
    styleUrls: ['./empleados.component.scss'],
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadosComponent
{
}
