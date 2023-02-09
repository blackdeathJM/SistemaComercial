import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {EmpleadoDto, EmpleadoType, RegEmpleadoDto} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.dto';

@Injectable()
export class EmpleadoService
{
    constructor(@InjectModel(EmpleadoDto.name) private empleado: Model<EmpleadoType>)
    {
    }

    async empleados(): Promise<EmpleadoDto[]>
    {
        try
        {
            return await this.empleado.find().exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: 'Error al consultar empleados'});
        }
    }

    async filtrarEmpleados(nombreCompleto: string): Promise<EmpleadoDto[]>
    {
        try
        {
            return await this.empleado.find({nombreCompleto: {$regex: nombreCompleto, $options: 'i'}}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async empleadosSesion(): Promise<EmpleadoDto[]>
    {
        try
        {
            return await this.empleado.find({auth: {$ne: null}, activo: true}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }
    }

    async crearEmpleado(datosEmpleado: RegEmpleadoDto): Promise<EmpleadoDto>
    {
        try
        {
            return await this.empleado.create(datosEmpleado);
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }
    }

    async buscarEmpleadoPorId(_id: string): Promise<EmpleadoDto>
    {
        if (_id)
        {
            return await this.empleado.findById(_id).exec();
        }
        return null;
    }

    async validarUsuarioActivo(_id: string): Promise<EmpleadoDto>
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
