import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {debounceTime, map, Subscription, switchMap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule, DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {EmpleadosGQL} from '#/libs/datos/src';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {cloneDeep} from 'lodash-es';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ListaDetalleComponent} from '@s-shared/plantillas/lista-detalle/lista-detalle.component';
import {MatInputModule} from '@angular/material/input';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {DetalleEmpleadoComponent} from '@s-app/empleado/components/detalle-empleado/detalle-empleado.component';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';

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
            TailwindLoadingComponent
        ],
    selector: 'app-empleado',
    templateUrl: './empleado.component.html',
    styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit, OnDestroy
{
    abrirP: boolean = false;
    controlBuscar: FormControl = new FormControl();
    empleadoSeleccionado: IResolveEmpleado;
    stateEmpleados: IResolveEmpleado[];
    subscripciones: Subscription = new Subscription();

    constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: any, private router: Router,
                private fuseMediaWatcherService: FuseMediaWatcherService, private empleadosGQL: EmpleadosGQL)
    {
    }

    ngOnInit(): void
    {
        this.subscripciones.add(this.empleadosGQL.watch({}, {notifyOnNetworkStatusChange: true}).valueChanges.pipe(switchMap((res) =>
        {
            if (res.data)
            {
                this.stateEmpleados = STATE_EMPLEADOS(cloneDeep(res.data.empleados) as IResolveEmpleado[]);
            }
            return this.controlBuscar.valueChanges.pipe(debounceTime(200), map(value => res.data.empleados
                .filter(v => v.nombreCompleto.toLowerCase().includes(value.toLowerCase()))));
        })).subscribe((datosFiltrados) =>
        {
            this.stateEmpleados = STATE_EMPLEADOS(datosFiltrados as IResolveEmpleado[]);
        }));
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
