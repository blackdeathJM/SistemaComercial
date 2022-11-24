import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {Subject, takeUntil} from 'rxjs';

@Component({
    selector: 'app-instalaciones',
    standalone: true,
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            RouterLink,
            MatSidenavModule
        ],
    templateUrl: './instalaciones.component.html',
    styleUrls: ['./instalaciones.component.scss'],
})
export class InstalacionesComponent implements OnInit, OnDestroy
{
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private fuseMediaWatcherService: FuseMediaWatcherService)
    {
    }

    ngOnInit(): void
    {
        this.fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this.unsubscribeAll)).subscribe(({matchingAliases}) =>
        {
            if (matchingAliases.includes('lg'))
            {
                this.drawerMode = 'side';
                this.drawerOpened = true;
            } else
            {
                this.drawerMode = 'over';
                this.drawerOpened = false;
            }
        });
    }

    ngOnDestroy(): void
    {
        this.unsubscribeAll.next(null);
        this.unsubscribeAll.complete();
    }
}
