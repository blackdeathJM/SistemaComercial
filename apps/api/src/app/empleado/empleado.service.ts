import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {EmpleadoDto, EmpleadoType, IEmpleado} from "@sistema-comercial/models";
import {Model} from "mongoose";

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
}
