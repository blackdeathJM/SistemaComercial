import {AfterContentInit, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ListaDetalleComponent} from '@s-shared/plantillas/lista-detalle/lista-detalle.component';
import {MatInputModule} from '@angular/material/input';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {DetalleEmpleadoComponent} from '@s-admin/components/detalle-empleado/detalle-empleado.component';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {ListaEmpleadosComponent} from '@s-shared/components/lista-empleados/lista-empleados.component';
import {STATE_ABRIR_CERRAR_PANEL} from '@s-general/variables-docs.state';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatFormFieldModule,
            MatIconModule,
            ListaDetalleComponent,
            MatInputModule,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            DetalleEmpleadoComponent,
            ListaEmpleadosComponent,
        ],
    selector: 'app-empleado',
    templateUrl: './empleado.component.html',
    styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements AfterContentInit
{
    abrirP: boolean = STATE_ABRIR_CERRAR_PANEL();
    ctrlBuscar: FormControl = new FormControl();

    constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: any, public entityEmpleadoStore: EntityEmpleadoStore)
    {
    }

    ngAfterContentInit(): void
    {
        // this.ctrlBuscar.valueChanges.pipe(auditTime(1000), map((res: string) => this.stateEmpleados.filtrarEmpleado(res))).subscribe();
    }

    cerrarP(evento: boolean): void
    {
        this.abrirP = evento;
    }
}
