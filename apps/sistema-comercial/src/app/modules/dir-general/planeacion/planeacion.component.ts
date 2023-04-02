import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {SeleccionService} from '@s-dir-general/selecciones/store/seleccion.service';
import {forkJoin, Subscription} from 'rxjs';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';

@Component({
    selector: 'app-planeacion',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './planeacion.component.html',
    styleUrls: ['./planeacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaneacionComponent implements OnInit, OnDestroy
{
    sub = new Subscription();

    constructor(private seleccionService: SeleccionService, private empleadoService: EmpleadoService)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(forkJoin([this.seleccionService.selecciones(), this.empleadoService.empleadosConSesion()]).subscribe());
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
