import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ObjectId} from 'bson';
import {EmpleadoDto, EmpleadoType} from '@sistema-comercial/modelos/empleado.dto';
import {IEmpleado} from '@sistema-comercial/modelos/empleado.interface';

@Injectable()
export class EmpleadoService
{
    constructor(@InjectModel(EmpleadoDto.name) private empleado: Model<EmpleadoType>)
    {
    }

    async empleados(): Promise<IEmpleado[]>
    {
        return await this.empleado.find().exec();
    }

    async empleadosSesion(): Promise<IEmpleado[]>
    {
        try
        {
            return await this.empleado.find({auth: {$ne: null}}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }
    }

    async crearEmpleado(datosEmpleado: IEmpleado): Promise<IEmpleado>
    {
        try
        {
            return await this.empleado.create(datosEmpleado);
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }
    }

    async buscarEmpleadoPorId(_id: string): Promise<IEmpleado | NotFoundException>
    {
        const empleado = await this.empleado.findById(new ObjectId(_id)).exec();
        if (!empleado)
        {
            throw new NotFoundException('No se encontro usuario');
        }
        return empleado;
    }
}
