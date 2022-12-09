import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {NotificacionDto} from '#api/libs/models/src/lib/general/notificacion/notificacion.dto';
import {PubSub} from 'graphql-subscriptions';
import {NotificacionService} from '@api-general/notificaciones/notificacion.service';

@Resolver(() => NotificacionDto)
export class NotificacionResolver
{
    #pubSub: PubSub = new PubSub();

    constructor(private notificacionService: NotificacionService)
    {

    }

    @Query(() => [NotificacionDto], {nullable: true, defaultValue: null})
    async notificaciones(@Args('idUsuario') idUsuario: string): Promise<NotificacionDto[]>
    {
        return await this.notificacionService.notificaciones(idUsuario);
    }

    @Mutation(() => NotificacionDto)
    async regNot(@Args('datos') datos: NotificacionDto): Promise<NotificacionDto>
    {
        const nvaNotificacion = await this.notificacionService.regNot(datos);
        await this.#pubSub.publish('nvaNotificacion', nvaNotificacion);
        return nvaNotificacion;
    }

    @Subscription(() => NotificacionDto, {
        filter: (payload, variables) =>
        {
            console.log('filtro', payload, variables);
            return null;
        }, resolve: payload => console.log(payload)
    })
    nvaNotificacion(@Args('idEmpleado') idEmpleado: string): AsyncIterator<NotificacionDto>
    {
        return this.#pubSub.asyncIterator('nvaNotificacion');
    }
}
