import {Injectable} from '@angular/core';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {EliminarNotGQL, EliminarNotMutation, EliminarTodosGQL, EliminarTodosMutation, NotificacionesGQL, NotificacionesQuery, NotificarGQL, NotificarSubscription} from '#/libs/datos/src';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {Observable, tap} from 'rxjs';
import {ApolloQueryResult, SingleExecutionResult} from '@apollo/client';
import {EntityNotificacion} from '@s-layout/notifications/store/notificacion.store';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {INotificacion} from '#/libs/models/src/lib/general/notificacion/notificacion.interface';
import {SubscriptionResult} from 'apollo-angular';

@Injectable({providedIn: 'root'})
export class NotificacionService
{
    constructor(private ngxToast: NgxToastService, private notificacionesGQL: NotificacionesGQL, private notificarGQL: NotificarGQL, private eliminarNotGQL: EliminarNotGQL,
                private eliminarTodosGQL: EliminarTodosGQL, private stateAuth: StateAuth, private entityNotificacion: EntityNotificacion)
    {
    }

    notificaciones(): Observable<ApolloQueryResult<NotificacionesQuery>>
    {
        return this.notificacionesGQL.watch({idUsuario: this.stateAuth.snapshot._id}).valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const notificaciones = $cast<INotificacion[]>(res.data.notificaciones);
                this.entityNotificacion.setAll(notificaciones);
            }
        }));
    }

    notificar(): Observable<SubscriptionResult<NotificarSubscription>>
    {
        return this.notificarGQL.subscribe({idUsuario: this.stateAuth.snapshot._id}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const nvaNotificacion = $cast<INotificacion>(res.data.notificar);
                this.entityNotificacion.addOne(nvaNotificacion);
                this.ngxToast.infoToast(res.data.notificar.descripcion, res.data.notificar.titulo, {closeButton: true, disableTimeOut: true});
            }
        }));
    }

    eliminarTodas(): Observable<SingleExecutionResult<EliminarTodosMutation>>
    {
        return this.eliminarTodosGQL.mutate({idUsuario: this.stateAuth.snapshot._id}).pipe(tap((res) =>
        {
            if (res.data.eliminarTodos !== 0)
            {
                this.entityNotificacion.removeAll();
            }
        }));
    }

    eliminar(notificacion: INotificacion): Observable<SingleExecutionResult<EliminarNotMutation>>
    {
        return this.eliminarNotGQL.mutate({_id: notificacion._id}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                this.entityNotificacion.removeOne(notificacion._id);
            }
        }));
    }
}
