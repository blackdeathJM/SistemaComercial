import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {NotificacionDto, NotificacionType} from '#api/libs/models/src/lib/general/notificacion/notificacion.dto';
import {Model} from 'mongoose';

@Injectable()
export class NotificacionService
{
    constructor(@InjectModel(NotificacionDto.name) private notificacion: Model<NotificacionType>)
    {
    }

    async notificaciones(): Promise<NotificacionDto[]>
    {
        return [];
    }

    async regNotificacion(datos: NotificacionDto): Promise<NotificacionDto>
    {
        try
        {
            return await this.notificacion.create(datos);
        } catch (e)
        {
            throw new InternalServerErrorException({message: 'Ocurrio un error inesperado'});
        }
    }
}
