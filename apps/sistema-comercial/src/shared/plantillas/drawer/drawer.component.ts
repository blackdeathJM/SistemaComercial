import {ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AsyncPipe, DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {Subject, takeUntil} from 'rxjs';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {DrawerService} from '@s-shared/plantillas/drawer/drawer.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
    standalone: true,
    imports:
        [
            MatSidenavModule,
            AsyncPipe,
            MatButtonModule,
            MatIconModule,
            MatCardModule
        ],
    selector: 'app-drawer',
    templateUrl: './drawer.component.html',
    styleUrls: ['./drawer.component.scss'],
    exportAs: 'app-lista-detalle'
})
export class DrawerComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawerIzq', {static: true}) matDrawerIzq: MatDrawer;
    @ViewChild('matDrawerDer', {static: true}) matDrawerDer: MatDrawer;
    @Input() anchoIzq: string = 'w-72';
    @Input() anchoDer: string = 'w-72';
    drawerModeIzq: 'side' | 'over';
    drawModeDer: 'side' | 'over';
    panelIzq$ = this.panelService.getPanelIzq;
    panelDer$ = this.panelService.getPanelDer;
    private sub: Subject<any> = new Subject<any>();

    constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: any, private router: Router,
                private fuseMediaWatcherService: FuseMediaWatcherService, private panelService: DrawerService)
    {
    }

    ngOnInit(): void
    {
        this.matDrawerIzq.openedChange.subscribe((opened) =>
        {
            if (!opened)
            {
                this.cdr.reattach();
            }
        });
        this.matDrawerDer.openedChange.subscribe((abierto) =>
        {
            if (!abierto)
            {
                this.cdr.reattach();
            }
        });

        this.fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this.sub)).subscribe(({matchingAliases}) =>
        {
            if (matchingAliases.includes('lg'))
            {
                this.drawerModeIzq = 'side';
                this.drawModeDer = 'side';
            } else
            {
                this.drawerModeIzq = 'over';
                this.drawModeDer = 'over';
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

    ngOnDestroy(): void
    {
        this.sub.next(null);
        this.sub.complete();
    }
}
