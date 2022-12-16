import {AfterContentInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {auditTime, map, Observable, Subscription, tap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule, DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ListaDetalleComponent} from '@s-shared/plantillas/lista-detalle/lista-detalle.component';
import {MatInputModule} from '@angular/material/input';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {DetalleEmpleadoComponent} from '@s-admin/components/detalle-empleado/detalle-empleado.component';
import {Select} from '@ngxs/store';
import {StateEmpleados} from '@s-admin/empleados.store';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {FuseAlertModule} from '@s-fuse/alert';

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
            NgxSpinnerModule,
            FuseAlertModule
        ],
    selector: 'app-empleado',
    templateUrl: './empleado.component.html',
    styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit, AfterContentInit, OnDestroy
{
    @Select(StateEmpleados.empleados)
    empleados$: Observable<IResolveEmpleado[]>;
    abrirP: boolean = false;
    controlBuscar: FormControl = new FormControl();
    empleadoSeleccionado: IResolveEmpleado;
    subscripciones: Subscription = new Subscription();

    constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: any, private router: Router,
                private fuseMediaWatcherService: FuseMediaWatcherService, public stateEmpleados: StateEmpleados, private ngxspinner: NgxSpinnerService)
    {
    }

    ngAfterContentInit(): void
    {
        this.controlBuscar.valueChanges.pipe(auditTime(1000), map((res: string) => this.stateEmpleados.filtrarEmpleado(res))).subscribe();
    }

    ngOnInit(): void
    {
        this.stateEmpleados.cargarEmpleados();
    }

    seleccionarEmpleado(empleado: IResolveEmpleado): void
    {
        this.empleadoSeleccionado = empleado;
        this.abrirP = true;
    }

    cerrarP(evento: boolean): void
    {
        this.abrirP = evento;
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    ngOnDestroy(): void
    {
        this.subscripciones.unsubscribe();
    }
}
