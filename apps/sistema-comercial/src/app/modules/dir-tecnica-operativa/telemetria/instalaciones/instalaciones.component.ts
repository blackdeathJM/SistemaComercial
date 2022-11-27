import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {Subject, takeUntil} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ModInstalacionComponent} from '@s-app/dir-tecnica-operativa/telemetria/instalaciones/mod-instalacion/mod-instalacion.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {DetalleInstalacionComponent} from '@s-app/dir-tecnica-operativa/telemetria/instalaciones/detalle-instalacion/detalle-instalacion.component';
import {DetalleMotorComponent} from '@s-app/dir-tecnica-operativa/telemetria/motor/detalle-motor/detalle-motor.component';
import {DetalleBombaComponent} from '@s-app/dir-tecnica-operativa/telemetria/bomba/detalle-bomba/detalle-bomba.component';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
    selector: 'app-instalaciones',
    standalone: true,
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            RouterLink,
            MatSidenavModule,
            MatCardModule,
            MatDividerModule,
            DetalleInstalacionComponent,
            DetalleMotorComponent,
            DetalleBombaComponent,
            MatTabsModule,
        ],
    templateUrl: './instalaciones.component.html',
    styleUrls: ['./instalaciones.component.scss'],
})
export class InstalacionesComponent implements OnInit, OnDestroy
{
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private fuseMediaWatcherService: FuseMediaWatcherService, private dRef: MatDialog)
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

    altaInstalacion(): void
    {
        this.dRef.open(ModInstalacionComponent, {width: '45%', data: null});
    }

    ngOnDestroy(): void
    {
        this.unsubscribeAll.next(null);
        this.unsubscribeAll.complete();
    }
}
