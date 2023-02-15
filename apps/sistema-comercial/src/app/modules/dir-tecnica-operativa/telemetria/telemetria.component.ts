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

@Component({
    selector: 'app-telemetria',
    standalone: true,
    imports:
        [
            CommonModule,
            RouterOutlet,
            MatSidenavModule,
            NgxUiLoaderModule,
            MatListModule
        ],
    templateUrl: './telemetria.component.html',
    styleUrls: ['./telemetria.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelemetriaComponent implements OnInit, OnDestroy
{
    ngxLoader = 'ngxLoaderInstalaciones';

    constructor(public entityTelemetria: EntityTelemetria, private telemetriaService: TelemetriaService)
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

    ngOnDestroy(): void
    {
        this.entityTelemetria.reset();
    }
}
