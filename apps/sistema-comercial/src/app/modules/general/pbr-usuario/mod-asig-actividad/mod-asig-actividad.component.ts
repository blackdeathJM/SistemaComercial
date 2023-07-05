import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from "@angular/material/list";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {EmpleadoQuery} from "@s-dirAdmonFinanzas/empleados/store/empleado.query";
import {EmpleadoService} from "@s-dirAdmonFinanzas/empleados/store/empleado.service";
import {Empleado} from "#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/Empleado";
import {RegistrosComponent} from "@s-shared/registros/registros.component";

@Component({
    selector: 'app-mod-asig-actividad',
    standalone: true,
    imports: [CommonModule, MatListModule, RegistrosComponent],
    templateUrl: './mod-asig-actividad.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModAsigActividadComponent implements OnInit
{
    constructor(public planeacionQuery: PlaneacionQuery, public empleadoQuery: EmpleadoQuery, private empleadoService: EmpleadoService) {}

    ngOnInit(): void
    {
        this.empleadoService.empleadosConSesion().subscribe();
    }

    protected readonly Empleado = Empleado;

    cancelar(): void
    {

    }

    registro(): void
    {

    }
}
