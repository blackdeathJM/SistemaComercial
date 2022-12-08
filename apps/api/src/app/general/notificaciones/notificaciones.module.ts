import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {NotificacionDto, SCHEMA_NOTIFICAIONES} from '#api/libs/models/src/lib/general/notificacion/notificacion.dto';

@Module({
    imports: [MongooseModule.forFeature([{name: NotificacionDto.name, schema: SCHEMA_NOTIFICAIONES}])]
})
export class NotificacionesModule
{
}
