import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {INotificacionState, NotificacionStore} from '@s-layout/notifications/store/notificacion.store';
import {INotificacion} from '#/libs/models/src/lib/general/notificacion/notificacion.interface';

@Injectable({providedIn: 'root'})
export class NotificacionQuery extends QueryEntity<INotificacionState, INotificacion>
{
    constructor(protected notificacionStore: NotificacionStore)
    {
        super(notificacionStore);
    }
}
