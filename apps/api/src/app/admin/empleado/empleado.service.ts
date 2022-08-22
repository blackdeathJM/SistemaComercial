import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {EmpleadoDto, EmpleadoType, IEmpleado} from '@sistema-comercial/models';
import {Model} from 'mongoose';
import {ObjectId} from 'bson';

@Injectable()
export class EmpleadoService
{
    constructor(@InjectModel(EmpleadoDto.name) private empleado: Model<EmpleadoType>)
    {
    }

    async empleados(): Promise<IEmpleado[]>
    {
        return this.empleado.find().exec();
    }

    async crearEmpleado(datosEmpleado: IEmpleado): Promise<IEmpleado>
    {
        return this.empleado.create(datosEmpleado);
    }

    async buscarEmpleadoPorId(_id: string): Promise<IEmpleado | NotFoundException>
    {
        const resultado = await this.empleado.findById(new ObjectId(_id)).exec();
        if (!resultado)
        {
            throw new NotFoundException('No se encontro usuario');
        }
        return resultado;
    }
}
