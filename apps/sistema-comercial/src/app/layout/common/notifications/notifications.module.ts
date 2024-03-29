import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SharedModule} from '@s-shared/shared.module';
import {NotificationsComponent} from '@s-layout/notifications/notifications.component';
import {ConvertirTimestamUnixPipe} from '#/apps/sistema-comercial/src/app/pipes/convertir-timestam-unix.pipe';

@NgModule({
    declarations:
        [
            NotificationsComponent
        ],
    imports:
        [
            RouterModule,
            OverlayModule,
            PortalModule,
            MatButtonModule,
            MatIconModule,
            MatTooltipModule,
            SharedModule,
            ConvertirTimestamUnixPipe
        ],
    exports:
        [
            NotificationsComponent
        ]
})
export class NotificationsModule
{
}
