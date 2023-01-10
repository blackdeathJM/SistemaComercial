import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AsyncPipe, DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {Subject, takeUntil} from 'rxjs';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {ListaDetalleService} from '@s-shared/plantillas/lista-detalle/lista-detalle.service';

@Component({
    standalone: true,
    imports:
        [
            MatSidenavModule,
            AsyncPipe
        ],
    selector: 'app-drawer',
    templateUrl: './drawer.component.html',
    styleUrls: ['./drawer.component.scss'],
    exportAs: 'app-lista-detalle'
})
export class DrawerComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    panel$ = this.panelService.getPanel;
    private sub: Subject<any> = new Subject<any>();

    constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: any, private router: Router,
                private fuseMediaWatcherService: FuseMediaWatcherService, private panelService: ListaDetalleService)
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
        console.log('lista detalle', item);
        return item._id || index;
    }

    ngOnDestroy(): void
    {
        this.sub.next(null);
        this.sub.complete();
    }
}
