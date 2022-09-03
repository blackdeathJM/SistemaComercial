import {AfterContentInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {FormControl} from '@angular/forms';
import {IEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Subject, Subscription, takeUntil, tap} from 'rxjs';
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
export class EmpleadoComponent implements OnInit, OnDestroy, AfterContentInit
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    controlBuscar: FormControl = new FormControl();
    empleadoSeleccionado: IEmpleado;
    stateEmpleados: IEmpleado[];
    subscripciones: Subscription = new Subscription();
    private eliminarSubscripcion: Subject<any> = new Subject<any>();

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
        this.matDrawer.openedChange.subscribe((opened) =>
        {
            if (!opened)
            {
                this.empleadoSeleccionado = null;
                this.cdr.markForCheck();
            }
        });

        this.fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this.eliminarSubscripcion)).subscribe(({matchingAliases}) =>
        {
            if (matchingAliases.includes('lg'))
            {
                this.drawerMode = 'side';
            } else
            {
                this.drawerMode = 'over';
            }
        });

        // fromEvent(this.document, 'keydown').pipe(takeUntil(this.eliminarSubscripcion),
        //     filter<KeyboardEvent>(event => (event.ctrlKey === true || event.metaKey) && (event.key === '/'))).subscribe(() => this.asignarAuth());
    }

    ngAfterContentInit(): void
    {

    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    seleccionarEmpleado(empleado: IEmpleado): void
    {
        this.empleadoSeleccionado = empleado;
        this.listaDetalleComponent.abrirPanel(true);
    }

    abrirPanel(evento: boolean): void
    {
        this.listaDetalleComponent.abrirPanel(evento);
    }

    ngOnDestroy(): void
    {
        this.eliminarSubscripcion.next(null);
        this.eliminarSubscripcion.complete();
    }

}
