import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {INotificacion} from '#/libs/models/src/lib/general/notificacion/notificacion.interface';
import {Injectable} from '@angular/core';

export interface INotificacionState extends EntityState<INotificacion, string>, ActiveState
{
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'Notificaciones', idKey: '_id'})
export class NotificacionStore extends EntityStore<INotificacionState, INotificacion>
{
    constructor()
    {
        super();
    }
}
