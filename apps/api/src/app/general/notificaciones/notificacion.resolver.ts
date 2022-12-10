import {Args, Query, Resolver, Subscription, Mutation} from '@nestjs/graphql';
import {NotificacionDto} from '#api/libs/models/src/lib/general/notificacion/notificacion.dto';
import {PubSub} from 'graphql-subscriptions';
import {NotificacionService} from '@api-general/notificaciones/notificacion.service';
import {INotificacion} from '#api/libs/models/src/lib/general/notificacion/notificacion.interface';

export const subNotificacion: PubSub = new PubSub();

@Resolver(() => NotificacionDto)
export class NotificacionResolver
{
    constructor(private notificacionService: NotificacionService)
    {
    }

    @Query(() => [NotificacionDto], {nullable: true, defaultValue: null})
    async notificaciones(@Args('idUsuario') idUsuario: string): Promise<NotificacionDto[]>
    {
        return await this.notificacionService.notificaciones(idUsuario);
    }

    @Mutation(() => NotificacionDto)
    async eliminarNot(@Args('_id') _id: string): Promise<NotificacionDto>
    {
        return await this.notificacionService.eliminarNot(_id);
    }

    @Mutation(() => NotificacionDto)
    async marcarLeido(@Args('_id') _id: string): Promise<NotificacionDto>
    {
        return await this.notificacionService.marcarLeido(_id);
    }

    @Mutation(() => [NotificacionDto])
    async eliminarTodos(@Args('idUsuario') idUsuario: string): Promise<any>
    {
        return await this.notificacionService.eliminarTodos(idUsuario);
    }

    @Subscription(() => NotificacionDto, {
        filter: (payload: INotificacion, variables) => payload.idUsuario.toString() === variables.idUsuario,
        resolve: (res => res)
    })
    notificar(@Args('idUsuario') idUsuario: string): AsyncIterator<NotificacionDto>
    {
        return subNotificacion.asyncIterator('notificar');
    }
}
