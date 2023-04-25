import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {fuseAnimations} from '@s-fuse/public-api';
import {ListaEmpleadosComponent} from '@s-dirAdmonFinanzas/empleados/lista-empleados/lista-empleados.component';
import {DeptoQuery} from "@s-dirAdmonFinanzas/departamento/store/depto.query";
import {DeptoService} from "@s-dirAdmonFinanzas/departamento/store/depto.service";
import {forkJoin} from "rxjs";
import {EmpleadoService} from "@s-dirAdmonFinanzas/empleados/store/empleado.service";


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
export class EmpleadosComponent implements OnInit
{
    constructor(private deptoService: DeptoService, private empleadoService: EmpleadoService)
    {
    }

    ngOnInit(): void
    {
        forkJoin([this.deptoService.departamentos(), this.empleadoService.empleados()]).subscribe();
    }
}
