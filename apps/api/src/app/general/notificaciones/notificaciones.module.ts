import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {NotificacionResolver} from '@api-general/notificaciones/notificacion.resolver';
import {NotificacionService} from '@api-general/notificaciones/notificacion.service';
import {NotificacionDto, SCHEMA_NOTIFICACION} from '#api/libs/models/src/lib/general/notificacion/notificacion.dto';

@Module({
    imports: [MongooseModule.forFeature([{name: NotificacionDto.name, schema: SCHEMA_NOTIFICACION}])],
    providers: [NotificacionResolver, NotificacionService]
})
export class NotificacionesModule
{
}
