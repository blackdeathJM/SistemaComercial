import {AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {MatButton} from '@angular/material/button';
import {Subject, Subscription, takeUntil} from 'rxjs';
import {NotificationsService} from '@s-layout/notifications/notifications.service';
import {Notification} from '@s-layout/notifications/notifications.types';
import {STATE_DATOS_SESION} from '@s-core/auth/auth.state';
import {NotificacionesGQL, NotificarGQL} from '#/libs/datos/src';
import {STATE_NOTIFICACION} from '@s-layout/notifications/notificacion.state';
import {INotificacion} from '#/libs/models/src/lib/general/notificacion/notificacion.interface';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'notifications'
})
export class NotificationsComponent implements OnInit, OnDestroy, AfterContentInit
{
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;

    notificaciones: INotificacion[];
    unreadCount: number = 0;
    sub: Subscription = new Subscription();
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef, private _notificationsService: NotificationsService, private _overlay: Overlay,
                private _viewContainerRef: ViewContainerRef, private notificacionesGQL: NotificacionesGQL, private notificarGQL: NotificarGQL,
                private ngxToastService: NgxToastService)
    {
    }

    ngOnInit(): void
    {

        this.notificacionesGQL.watch().valueChanges.subscribe((res) =>
        {
            if (res.data.notificaciones)
            {
                STATE_NOTIFICACION(res.data.notificaciones as INotificacion[]);
            }
        });
    }

    ngAfterContentInit(): void
    {
        this.notificaciones = STATE_NOTIFICACION();

        this.sub.add(this.notificarGQL.subscribe({idUsuario: STATE_DATOS_SESION()._id}).subscribe((res) =>
        {
            const nvaNotificacion = STATE_NOTIFICACION();
            STATE_NOTIFICACION([...nvaNotificacion, res.data.notificar as INotificacion]);
            this.ngxToastService.infoToast(res.data.notificar.descripcion, res.data.notificar.titulo, {
                closeButton: true, disableTimeOut: true,
                positionClass: 'toast-bottom-full-width'
            });
        }));
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if (this._overlayRef)
        {
            this._overlayRef.dispose();
        }
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

    /**
     * Close the notifications panel
     */
    closePanel(): void
    {
        this._overlayRef.detach();
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(): void
    {
        // Mark all as read
        this._notificationsService.markAllAsRead().subscribe();
    }

    /**
     * Toggle read status of the given notification
     */
    toggleRead(notification: INotificacion): void
    {
        // Toggle the read status
        // notification.read = !notification.read;
        //
        // // Update the notification
        // this._notificationsService.update(notification.id, notification).subscribe();
    }

    /**
     * Delete the given notification
     */
    delete(notification: Notification): void
    {
        // Delete the notification
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
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


    private _calculateUnreadCount(): void
    {
        // let count = 0;
        //
        // if (this.notificaciones && this.notificaciones.length)
        // {
        //     count = this.notificaciones.filter(notification => !notification.read).length;
        // }
        //
        // this.unreadCount = count;
    }
}
