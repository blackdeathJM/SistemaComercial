import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {INotificacionState, NotificacionStore} from '@s-layout/notifications/store/notificacion.store';
import {INotificacion} from '#/libs/models/src/lib/general/notificacion/notificacion.interface';
import {map, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificacionQuery extends QueryEntity<INotificacionState, INotificacion>
{
    constructor(protected notificacionStore: NotificacionStore)
    {
        super(notificacionStore);
    }

    public get sinLeer(): Observable<number>
    {
        return this.selectAll().pipe(map(res => res.filter(value => !value.leido).length));
    }
}
