import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {EntityTelemetria} from "@s-dir-tecnica-operativa/store/telemetria.entity";

@Component({
    selector: 'app-telemetria',
    standalone: true,
    imports:
        [
            CommonModule,
            RouterOutlet,
            MatSidenavModule,
            NgxUiLoaderModule
        ],
    templateUrl: './telemetria.component.html',
    styleUrls: ['./telemetria.component.scss'],
})
export class TelemetriaComponent
{
    ngxLoader = 'ngxLoaderInstalaciones';

    constructor(public entityTelemetria: EntityTelemetria)
    {
    }
}
