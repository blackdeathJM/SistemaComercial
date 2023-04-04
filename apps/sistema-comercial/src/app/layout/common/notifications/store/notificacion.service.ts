import {Injectable} from '@angular/core';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {EliminarNotGQL, EliminarNotMutation, EliminarTodosGQL, EliminarTodosMutation, NotificacionesGQL, NotificacionesQuery, NotificarGQL, NotificarSubscription} from '#/libs/datos/src';
import {Observable, tap} from 'rxjs';
import {ApolloQueryResult, SingleExecutionResult} from '@apollo/client';
import {INotificacion} from '#/libs/models/src/lib/general/notificacion/notificacion.interface';
import {SubscriptionResult} from 'apollo-angular';
import {AuthQuery} from '@s-core/auth/store/auth.query';
import {NotificacionStore} from '@s-layout/notifications/store/notificacion.store';

@Injectable({providedIn: 'root'})
export class NotificacionService
{
    idUsuario: string = null;

    constructor(private ngxToast: NgxToastService, private notificacionesGQL: NotificacionesGQL, private notificarGQL: NotificarGQL, private eliminarNotGQL: EliminarNotGQL,
                private eliminarTodosGQL: EliminarTodosGQL, authQuery: AuthQuery, private notificacionStore: NotificacionStore)
    {
        this.idUsuario = authQuery.getValue()._id;
    }

    notificaciones(): Observable<ApolloQueryResult<NotificacionesQuery>>
    {
        // return this.notificacionesGQL.fetch({idUsuario: this.stateAuth.snapshot._id}).pipe(tap((res) =>
        // {
        //     if (isNotNil(res.data))
        //     {
        //         const notificaciones = $cast<INotificacion[]>(res.data.notificaciones);
        //         this.entityNotificacion.setAll(notificaciones);
        //     }
        // }));

        return this.notificacionesGQL.fetch({idUsuario: this.idUsuario}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const notificaciones = res.data.notificaciones as INotificacion[];
                // this.entityNotificacion.setAll(notificaciones);
                this.notificacionStore.set(notificaciones);
            }
        }));
    }

    notificar(): Observable<SubscriptionResult<NotificarSubscription>>
    {
        return this.notificarGQL.subscribe({idUsuario: this.idUsuario}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const nvaNotificacion = res.data.notificar as INotificacion;
                // this.entityNotificacion.addOne(nvaNotificacion);
                this.notificacionStore.add(nvaNotificacion);
                this.ngxToast.infoToast(res.data.notificar.descripcion, res.data.notificar.titulo, {closeButton: true, disableTimeOut: true});
            }
        }));
    }

    eliminarTodas(): Observable<SingleExecutionResult<EliminarTodosMutation>>
    {
        return this.eliminarTodosGQL.mutate({idUsuario: this.idUsuario}).pipe(tap((res) =>
        {
            if (res.data.eliminarTodos !== 0)
            {
                // this.entityNotificacion.removeAll();
                this.notificacionStore.remove();
            }
        }));
    }

    eliminar(notificacion: INotificacion): Observable<SingleExecutionResult<EliminarNotMutation>>
    {
        return this.eliminarNotGQL.mutate({_id: notificacion._id}).pipe(tap((res) =>
        {
            if (res.data)
            {
                // this.entityNotificacion.removeOne(notificacion._id);
                this.notificacionStore.remove(notificacion._id);
            }
        }));
    }
}
