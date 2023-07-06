import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from "@angular/material/list";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {EmpleadoQuery} from "@s-dirAdmonFinanzas/empleados/store/empleado.query";
import {EmpleadoService} from "@s-dirAdmonFinanzas/empleados/store/empleado.service";
import {Empleado} from "#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/Empleado";
import {RegistrosComponent} from "@s-shared/registros/registros.component";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RxFormBuilder, RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {AsigActividad} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/Pbr";

@Component({
    selector: 'app-mod-asig-actividad',
    standalone: true,
    imports: [CommonModule, MatListModule, RegistrosComponent, ReactiveFormsModule, RxReactiveFormsModule],
    templateUrl: './mod-asig-actividad.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModAsigActividadComponent implements OnInit
{
    formAsigActividad: FormGroup = this.rxFb.formGroup(new AsigActividad());
    cargando = false;

    constructor(public planeacionQuery: PlaneacionQuery, public empleadoQuery: EmpleadoQuery, private empleadoService: EmpleadoService, private rxFb: RxFormBuilder) {}

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

    protected readonly FormGroup = FormGroup;

    selecActividad(e: Event): void
    {
        console.log(e)
    }
}
