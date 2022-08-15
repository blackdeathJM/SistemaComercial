import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {FormControl} from '@angular/forms';
import {IEmpleado} from '#/libs/models/src';
import {filter, fromEvent, Subject, takeUntil} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListaComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    cantidadEmpleados = 0;
    tablaColumnasEmpleados: string[] = ['nombre', 'departamento'];
    drawerMode: 'side' | 'over';
    controlBuscar: FormControl = new FormControl();
    empleadoSeleccionado: IEmpleado;
    stateEmpleados: IEmpleado[];
    private eliminarSubscripcion: Subject<any> = new Subject<any>();

    constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: any, private router: Router,
                private fuseMediaWatcherService: FuseMediaWatcherService)
    {
    }

    ngOnInit(): void
    {
        this.stateEmpleados = STATE_EMPLEADOS();
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
        fromEvent(this.document, 'keydown').pipe(takeUntil(this.eliminarSubscripcion),
            filter<KeyboardEvent>(event => (event.ctrlKey === true || event.metaKey) && (event.key === '/'))).subscribe(() => this.crearEmpleado());
    }

    crearEmpleado(): void
    {

    }

    onBackdropClicked(): void
    {
        this.router.navigate(['./'], {relativeTo: this.activatedRoute}).then();
        this.cdr.markForCheck();
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    ngOnDestroy(): void
    {
        this.eliminarSubscripcion.next(null);
        this.eliminarSubscripcion.complete();
    }
}
