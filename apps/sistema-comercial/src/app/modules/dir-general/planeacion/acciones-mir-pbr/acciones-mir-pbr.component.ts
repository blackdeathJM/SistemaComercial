import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {Subscription} from 'rxjs';
import {SeleccionarEmpleadoComponent} from '@s-shared/components/seleccionar-empleado/seleccionar-empleado.component';
import {EmpleadoQuery} from '@s-dirAdmonFinanzas/empleados/store/empleado.query';
import {SeleccionQuery} from '@s-dir-general/selecciones/store/seleccion.query';
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {idPlaneacion, PlaneacionService} from "@s-dir-general/store/planeacion.service";

@Component({
    selector: 'app-acciones-mir-pbr',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, SeleccionarEmpleadoComponent],
    templateUrl: './acciones-mir-pbr.component.html',
    styleUrls: ['./acciones-mir-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccionesMirPbrComponent
{
    @Input() habEmpleado = false;
    @Input() habCentroGestor = false;

    ctrlEmpleados = new FormControl();
    bCentroGestor: string;
    sub = new Subscription();

    constructor(public seleccionQuery: SeleccionQuery, private ngxToast: NgxToastService, public empleadoQuery: EmpleadoQuery, public planeacionQuery: PlaneacionQuery,
                private planeacionService: PlaneacionService)
    {
    }

    filAno(e: string): void
    {

        this.planeacionService.filPorAno(e).subscribe();
    }

    filEmpleado($event: any): void
    {

    }

    filCentroGestor($event: any): void
    {

    }

    trackByFn(index: number, elemento: string): number | string
    {
        return index || elemento;
    }
}
