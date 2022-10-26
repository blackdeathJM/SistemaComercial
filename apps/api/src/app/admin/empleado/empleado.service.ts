import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ObjectId} from 'bson';
import {EmpleadoDto, EmpleadoType, RegEmpleadoDto} from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {IEmpleado} from '#api/libs/models/src/lib/admin/empleado/empleado.interface';

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

    async crearEmpleado(datosEmpleado: RegEmpleadoDto): Promise<EmpleadoDto>
    {
        console.log(RegEmpleadoDto);
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
        if (_id)
        {
            return await this.empleado.findById(new ObjectId(_id)).exec();
        }
        return null;
    }

    async validarUsuarioActivo(_id: string): Promise<IEmpleado>
    {
        const empleado = await this.empleado.findById(_id).exec();
        if (!empleado.activo)
        {
            throw new UnauthorizedException('El empleado no esta activo');
        }
        delete empleado.auth.contrasena;
        return empleado;
    }
}
