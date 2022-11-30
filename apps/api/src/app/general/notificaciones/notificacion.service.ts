import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {NotificacionDto, NotificacionType} from '#api/libs/models/src/lib/general/notificacion/notificacion.dto';
import {Model} from 'mongoose';

@Injectable()
export class NotificacionService
{
    constructor(@InjectModel(NotificacionDto.name) private notificacion: Model<NotificacionType>)
    {
    }

    async regNotificacion(): Promise<NotificacionDto[]>
    {
        return [];
    }
}
