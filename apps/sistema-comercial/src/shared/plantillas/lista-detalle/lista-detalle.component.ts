import {ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {Subject, takeUntil} from 'rxjs';
import {MatDrawer} from '@angular/material/sidenav';


@Component({
    selector: 'app-lista-detalle',
    templateUrl: './lista-detalle.component.html',
    styleUrls: ['./lista-detalle.component.scss']
})
export class ListaDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    elementoSeleccionado: any;
    private eliminarSubscripcion: Subject<any> = new Subject<any>();

    constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: any, private router: Router,
                private fuseMediaWatcherService: FuseMediaWatcherService)
    {
    }

    ngOnInit(): void
    {
        this.matDrawer.openedChange.subscribe((opened) =>
        {
            if (!opened)
            {
                this.elementoSeleccionado = null;
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
    abrirPanel(evento: boolean): void
    {
        this.matDrawer.opened = evento;
    }
    ngOnDestroy(): void
    {
        this.eliminarSubscripcion.next(null);
        this.eliminarSubscripcion.complete();
    }
}
