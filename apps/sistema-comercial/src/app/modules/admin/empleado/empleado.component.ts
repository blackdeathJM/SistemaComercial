import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Observable, Subscription, tap} from 'rxjs';
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
import {StateEmpleados} from '@s-admin/empleado.store';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {FuseAlertModule} from "@s-fuse/alert";

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
export class EmpleadoComponent implements OnInit, OnDestroy
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

    ngOnInit(): void
    {
        this.stateEmpleados.cargarEmpleados();
        // this.subscripciones.add(this.empleadosGQL.watch({}, {notifyOnNetworkStatusChange: true}).valueChanges.pipe(switchMap((res) =>
        // {
        //     if (res.data)
        //     {
        //         this.stateEmpleados = STATE_EMPLEADOS(cloneDeep(res.data.empleados) as IResolveEmpleado[]);
        //     }
        //     return this.controlBuscar.valueChanges.pipe(debounceTime(200), map(value => res.data.empleados
        //         .filter(v => v.nombreCompleto.toLowerCase().includes(value.toLowerCase()))));
        // })).subscribe((datosFiltrados) =>
        // {
        //     this.stateEmpleados = STATE_EMPLEADOS(datosFiltrados as IResolveEmpleado[]);
        // }));
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
