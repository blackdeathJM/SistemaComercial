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

    async notificaciones(idUsuario: string): Promise<NotificacionDto[]>
    {
        try
        {
            return await this.notificacion.find({idUsuario}, {}, {sort: {tiempo: -1}}).exec();
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

    async eliminarNot(_id: string): Promise<NotificacionDto>
    {
        try
        {
            return await this.notificacion.findByIdAndDelete(_id).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }
    async eliminarTodos(idUsuario: string): Promise<number>
    {
        try
        {
            const notEliminadas = await this.notificacion.deleteMany({idUsuario}).exec();
            return notEliminadas.deletedCount;
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }
}
