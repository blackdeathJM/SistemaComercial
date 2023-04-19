import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
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
    @Output() porAno = new EventEmitter<number>();
    @Output() porCentroGestor = new EventEmitter<[string, number]>();
    @Output() porEmpleado = new EventEmitter<[string | string[], number]>();
    @Input() habEmpleado = false;
    @Input() habCentroGestor = false;

    ctrlEmpleados = new FormControl();
    bCentroGestor: string;
    sub = new Subscription();

    constructor(public seleccionQuery: SeleccionQuery, private ngxToast: NgxToastService, public empleadoQuery: EmpleadoQuery)
    {
    }

    buscarPorCentroGestor(e: string): void
    {
        // const ano = parseInt(String(this.buscarAno), 10);
        if (isNaN(ano))
        {
            this.ngxToast.alertaToast('Es necesario colocar una fecha para poder utilizar este filtrado', 'Filtrar centro gestor');
            return;
        }
        this.porCentroGestor.emit([e, ano]);
    }

    buscarPorAno(): void
    {
        const ano = parseInt(String(this.buscarAno), 10);
        if (isNaN(ano))
        {
            this.ngxToast.alertaToast('Introduce un año a cuatro digitos', 'Valor numerico requerido');
            return;
        }
        this.porAno.emit(ano);
    }

    buscarEmpleado(e: string | string[]): void
    {
        const ano = parseInt(String(this.buscarAno), 10);
        if (isNaN(ano))
        {
            this.ngxToast.alertaToast('Es necesario seleccionar año', 'Filtrado');
            return;
        }
        this.porEmpleado.emit([e, ano]);
    }

    trackByFn(index: number, elemento: string): number | string
    {
        return index || elemento;
    }
}
