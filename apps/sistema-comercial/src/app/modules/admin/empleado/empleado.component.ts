import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Subscription, tap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {EmpleadosGQL} from '#/libs/datos/src';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {ListaDetalleComponent} from '@s-shared/plantillas/lista-detalle/lista-detalle.component';

@Component({
    selector: 'app-empleado',
    templateUrl: './empleado.component.html',
    styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit, OnDestroy
{
    abrirP: boolean = false;
    controlBuscar: FormControl = new FormControl();
    empleadoSeleccionado: IEmpleado;
    stateEmpleados: IEmpleado[];
    subscripciones: Subscription = new Subscription();

    constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: any, private router: Router,
                private fuseMediaWatcherService: FuseMediaWatcherService, private empleadosGQL: EmpleadosGQL, private listaDetalleComponent: ListaDetalleComponent)
    {
    }

    ngOnInit(): void
    {
        this.subscripciones.add(this.empleadosGQL.watch().valueChanges.pipe(tap((res) =>
        {
            this.stateEmpleados = STATE_EMPLEADOS(res.data.empleados as IEmpleado[]);
        })).subscribe());
    }

    seleccionarEmpleado(empleado: IEmpleado): void
    {
        this.empleadoSeleccionado = empleado;
        this.abrirP = true;
    }

    abrirPanel(evento: boolean): void
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
