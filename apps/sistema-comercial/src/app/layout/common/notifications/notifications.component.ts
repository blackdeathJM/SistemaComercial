import {AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {MatButton} from '@angular/material/button';
import {Subscription} from 'rxjs';
import {INotificacion} from '#/libs/models/src/lib/general/notificacion/notificacion.interface';
import {EntityNotificacion} from '@s-layout/notifications/store/notificacion.entity';
import {NotificacionService} from '@s-layout/notifications/store/notificacion.service';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    encapsulation: ViewEncapsulation.None,
    exportAs: 'notifications',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit, OnDestroy, AfterContentInit
{
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;
    sub: Subscription = new Subscription();
    private _overlayRef: OverlayRef;

    constructor(private _overlay: Overlay, private _viewContainerRef: ViewContainerRef, public entityNotificacion: EntityNotificacion,
                private notificacionService: NotificacionService)
    {
    }

    ngOnInit(): void
    {
        this.notificacionService.notificaciones().subscribe();
    }

    ngAfterContentInit(): void
    {
        this.sub.add(this.notificacionService.notificar().subscribe());
    }

    openPanel(): void
    {
        // Return if the notifications panel or its origin is not defined
        if (!this._notificationsPanel || !this._notificationsOrigin)
        {
            return;
        }

        // Create the overlay if it doesn't exist
        if (!this._overlayRef)
        {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }

    closePanel(): void
    {
        this._overlayRef.detach();
    }

    eliminarTodas(): void
    {
        this.notificacionService.eliminarTodas().subscribe();
    }

    eliminar(notification: INotificacion): void
    {
        this.notificacionService.eliminar(notification).subscribe();
    }

    trackByFn(index: number, item: INotificacion): any
    {
        return item._id || index;
    }

    ngOnDestroy(): void
    {
        // Dispose the overlay
        if (this._overlayRef)
        {
            this._overlayRef.dispose();
        }
        this.sub.unsubscribe();
    }

    private _createOverlay(): void
    {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'fuse-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom'
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top'
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom'
                    }
                ])
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() =>
        {
            this._overlayRef.detach();
        });
    }
}
