import {Args, Mutation, Resolver, Subscription} from '@nestjs/graphql';
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

    @Mutation(() => NotificacionDto)
    async regNotificacion(@Args('datos') datos: NotificacionDto): Promise<void>
    {
        const nvaNotificacion = await this.notificacionService.regNotificacion(datos);
        await this.#pubSub.publish('nvaNotificacion', nvaNotificacion);
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
