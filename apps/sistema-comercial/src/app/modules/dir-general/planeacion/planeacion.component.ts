import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SeleccionService } from '@s-dir-general/selecciones/store/seleccion.service';
import { forkJoin, Subscription } from 'rxjs';
import { EmpleadoService } from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import { PlaneacionService } from '@s-dir-general/store/planeacion.service';

@Component({
    selector: 'app-planeacion',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './planeacion.component.html',
    styleUrls: ['./planeacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaneacionComponent implements OnInit
{
    constructor(private seleccionService: SeleccionService, private empleadoService: EmpleadoService, private planeacionService: PlaneacionService)
    {
    }

    ngOnInit(): void
    {
        forkJoin([
            this.seleccionService.selecciones(),
            this.empleadoService.empleadosConSesion(),
            this.planeacionService.filTodos()
        ]).subscribe();
    }
}
