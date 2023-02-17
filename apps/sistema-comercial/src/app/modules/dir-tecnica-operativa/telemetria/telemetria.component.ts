import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {TelemetriaService} from '@s-dir-tecnica-operativa/store/telemetria.service';
import {ITelemetria} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';
import {MatListModule} from '@angular/material/list';
import {fuseAnimations} from '@s-fuse/public-api';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModInstalacionComponent} from '@s-dir-tecnica-operativa/instalaciones/mod-instalacion/mod-instalacion.component';
import {CtrlTelemetria} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-tecnica-operativa/telemetria';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';

@Component({
    selector: 'app-telemetria',
    standalone: true,
    imports:
        [
            CommonModule,
            RouterOutlet,
            MatSidenavModule,
            NgxUiLoaderModule,
            MatListModule,
            MatButtonModule,
            MatIconModule,
            NavegacionPipe
        ],
    templateUrl: './telemetria.component.html',
    styleUrls: ['./telemetria.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelemetriaComponent implements OnInit, OnDestroy
{
    ngxLoader = 'ngxLoaderInstalaciones';
    ctrlNvaInstalacion: CtrlTelemetria.ctrlNvaInstalacion;

    constructor(public entityTelemetria: EntityTelemetria, private telemetriaService: TelemetriaService, private mdr: MatDialog)
    {
    }

    ngOnInit(): void
    {
        this.telemetriaService.instalaciones(this.ngxLoader).subscribe();
    }

    seleccionarInstalacion(instalacion: ITelemetria): void
    {
        this.entityTelemetria.patchState({instalacion: instalacion});
    }

    nvaInstalacion(): void
    {
        this.mdr.open(ModInstalacionComponent, {width: '40%', hasBackdrop: true, disableClose: true, data: false});
    }

    ngOnDestroy(): void
    {
        this.entityTelemetria.reset();
    }
}
