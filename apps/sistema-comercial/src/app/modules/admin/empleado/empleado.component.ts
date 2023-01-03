import {AfterContentInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ListaDetalleComponent} from '@s-shared/plantillas/lista-detalle/lista-detalle.component';
import {MatInputModule} from '@angular/material/input';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {DetalleEmpleadoComponent} from '@s-admin/components/detalle-empleado/detalle-empleado.component';
import {FuseAlertModule} from '@s-fuse/alert';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/entity-empleado.store';

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
            TailwindLoadingComponent,
            FuseAlertModule,
        ],
    selector: 'app-empleado',
    templateUrl: './empleado.component.html',
    styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit, AfterContentInit, OnDestroy
{
    abrirP: boolean = false;
    ctrlBuscar: FormControl = new FormControl();
    empleadoSeleccionado: IResolveEmpleado;
    subscripciones: Subscription = new Subscription();

    constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: any, public entityEmpleadoStore: EntityEmpleadoStore)
    {
    }

    ngOnInit(): void
    {
        this.entityEmpleadoStore.empleados();
    }

    ngAfterContentInit(): void
    {
        // this.ctrlBuscar.valueChanges.pipe(auditTime(1000), map((res: string) => this.stateEmpleados.filtrarEmpleado(res))).subscribe();
    }

    seleccionarEmpleado(empleado: IResolveEmpleado): void
    {
        this.empleadoSeleccionado = empleado;
        // this.entityEmpleadoStore.seleccionarEmpleado(empleado);
        this.abrirP = true;
    }

    cerrarP(evento: boolean): void
    {
        this.abrirP = evento;
    }

    trackByFn(index: number, item: IResolveEmpleado): any
    {
        return item._id || index;
    }

    ngOnDestroy(): void
    {
        this.subscripciones.unsubscribe();
    }
}
