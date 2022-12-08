import {Resolver} from '@nestjs/graphql';
import {NotificacionDto} from '#api/libs/models/src/lib/general/notificacion/notificacion.dto';

@Resolver(() => NotificacionDto)
export class NotificacionResolver
{
    constructor()
    {
    }
}
