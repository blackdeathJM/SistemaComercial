import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeleccionarEmpleadoComponent } from '@s-shared/components/seleccionar-empleado/seleccionar-empleado.component';
import { SeleccionQuery } from '@s-dir-general/selecciones/store/seleccion.query';
import { PlaneacionQuery } from '@s-dir-general/store/planeacion.query';
import { PlaneacionService } from '@s-dir-general/store/planeacion.service';

@Component({
    selector: 'app-acciones-mir-pbr',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, SeleccionarEmpleadoComponent],
    templateUrl: './acciones-mir-pbr.component.html',
    styleUrls: ['./acciones-mir-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccionesMirPbrComponent
{
    @Input() habCentroGestor = false;

    // consultas
    @Output() centroGestor = new EventEmitter<string>;

    valorCentroGestor: string;

    constructor(public seleccionQuery: SeleccionQuery, public planeacionQuery: PlaneacionQuery, private planeacionService: PlaneacionService)
    {
    }

    filAno(e: string): void
    {
        this.planeacionService.filPorAno(e).subscribe();
    }

    filCentroGestor(e: string): void
    {
        this.centroGestor.emit(e);
    }

    trackByFn(index: number, elemento: string): number | string
    {
        return index || elemento;
    }
}
