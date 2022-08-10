import {Injectable, NotAcceptableException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Depto, DeptoType} from './DTO/depto.dto';
import {Model} from 'mongoose';
import {IDepto} from '@sistema-comercial/models';

@Injectable()
export class DeptosService
{
    constructor(@InjectModel(Depto.name) private depto: Model<DeptoType>)
    {
    }

    async deptos(): Promise<IDepto[]>
    {
        return this.depto.find().exec();
    }

    async crearDepto(input: Depto): Promise<IDepto>
    {
        const buscarDepto = await this.depto.findOne({$or: [{nombre: input.nombre}, {centroGestor: input.centroGestor}]}).exec();
        if (buscarDepto)
        {
            throw new NotAcceptableException('No se puede registrar un documento duplicado', 'Crear departamento');
        }

        const depto = new this.depto(input);
        return depto.save();
    }
}
