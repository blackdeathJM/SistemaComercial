import {AfterContentInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from "@angular/material/list";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {EmpleadoQuery} from "@s-dirAdmonFinanzas/empleados/store/empleado.query";
import {EmpleadoService} from "@s-dirAdmonFinanzas/empleados/store/empleado.service";
import {RegistrosComponent} from "@s-shared/registros/registros.component";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RxFormBuilder, RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {AsigActividad} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/Pbr";
import {TAsigActividad} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {MatDialogRef} from "@angular/material/dialog";
import {finalize} from "rxjs";

@Component({
    selector: 'app-mod-asig-actividad',
    standalone: true,
    imports: [CommonModule, MatListModule, RegistrosComponent, ReactiveFormsModule, RxReactiveFormsModule],
    templateUrl: './mod-asig-actividad.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModAsigActividadComponent implements OnInit, AfterContentInit
{
    formAsigActividad: FormGroup = this.rxFb.formGroup(new AsigActividad());
    cargando = false;

    constructor(public planeacionQuery: PlaneacionQuery, public empleadoQuery: EmpleadoQuery, private empleadoService: EmpleadoService, private rxFb: RxFormBuilder, private planeacionService: PlaneacionService,
                public mdr: MatDialogRef<ModAsigActividadComponent>)
    {}

    ngOnInit(): void
    {
        this.empleadoService.empleadosConSesion().subscribe();
    }

    ngAfterContentInit(): void
    {
        const pbr = this.planeacionQuery.getActive().pbrCuestionario
        this.formAsigActividad.patchValue(pbr);
    }

    registro(): void
    {
        this.cargando = true;
        const {idEmpleadoAsig, idsIndicador} = this.formAsigActividad.value;
        const datos: TAsigActividad =
            {
                _id: this.planeacionQuery.getActive()._id,
                idEmpleadoAsig: idEmpleadoAsig[0],
                idsIndicador
            };
        this.formAsigActividad.disable();
        this.planeacionService.asigActividad(datos).pipe(finalize(() => this.mdr.close())).subscribe();
    }

    track(index: number): number
    {
        return index;
    }
}
