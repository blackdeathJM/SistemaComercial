import {ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {Subject, takeUntil} from 'rxjs';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {STATE_ABRIR_CERRAR_PANEL} from '@s-general/variables-docs.state';

@Component({
    standalone: true,
    imports:
        [
            MatSidenavModule
        ],
    selector: 'app-lista-detalle',
    templateUrl: './lista-detalle.component.html',
    styleUrls: ['./lista-detalle.component.scss'],
    exportAs: 'app-lista-detalle'
})
export class ListaDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    abriPanel = STATE_ABRIR_CERRAR_PANEL();
    private sub: Subject<any> = new Subject<any>();

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
                this.cdr.reattach();
            }
        });

        this.fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this.sub)).subscribe(({matchingAliases}) =>
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
        return item._id || index;
    }

    ngOnDestroy(): void
    {
        this.sub.next(null);
        this.sub.complete();
    }
}
