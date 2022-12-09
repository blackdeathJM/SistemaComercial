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

    async notificaciones(idEmpleado: string): Promise<NotificacionDto[]>
    {
        try
        {
            return await this.notificacion.find({idEmpleado}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.message});
        }
    }

    async regNot(datos: NotificacionDto): Promise<NotificacionDto>
    {
        try
        {
            return await this.notificacion.create(datos);
        } catch (e)
        {
            throw new InternalServerErrorException({message: 'Ocurrio un error inesperado'});
        }
    }

    async eliminarNot(): Promise<NotificacionDto>
    {
        try
        {
            return null;
        } catch (e)
        {

        }
    }

    async marcarLeido(): Promise<NotificacionDto>
    {
        return null;
    }

    async marcarLeidoTodos(): Promise<NotificacionDto[]>
    {
        return [];
    }
}
