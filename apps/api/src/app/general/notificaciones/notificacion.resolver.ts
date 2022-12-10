import {Args, Query, Resolver, Subscription} from '@nestjs/graphql';
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

    @Subscription(() => NotificacionDto, {
        filter: (payload: INotificacion, variables) => payload.idUsuario.toString() === variables.idUsuario, resolve: (resolve: INotificacion) =>
        {
            // if (resolve !== undefined)
            // {
            //     await this?.notificacionService.regNot(resolve);
            //     return resolve;
            console.log('=====>', resolve);
            return resolve;
        }
    })
    notificar(@Args('idUsuario') idUsuario: string): AsyncIterator<NotificacionDto>
    {
        return subNotificacion.asyncIterator('notificar');
    }
}
