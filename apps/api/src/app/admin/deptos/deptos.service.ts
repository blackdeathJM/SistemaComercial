import {Injectable, NotAcceptableException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ObjectId} from 'bson';
import {IDepto} from '@sistema-comercial/modelos/depto.interface';
import {DeptoDto, DeptoType} from '@sistema-comercial/modelos/depto.dto';


@Injectable()
export class DeptosService
{
    constructor(@InjectModel(DeptoDto.name) private depto: Model<DeptoType>)
    {
    }

    async deptos(): Promise<IDepto[]>
    {
        return this.depto.find().exec();
    }

    async crearDepto(input: DeptoDto): Promise<IDepto>
    {
        await this.buscarDepto(input.nombre, input.centroGestor);

        const depto = new this.depto(input);
        return depto.save();
    }

    async actualizarDepto(input: DeptoDto): Promise<IDepto>
    {

        await this.buscarDepto(input.nombre, input.centroGestor);

        const buscarDepto = await this.depto.findByIdAndUpdate(new ObjectId(input._id));
        Object.assign(buscarDepto, {...input});
        return buscarDepto.save();
    }

    async eliminarDepto(_id: string): Promise<IDepto>
    {
        return await this.depto.findByIdAndDelete(new ObjectId(_id)).exec();
    }

    async buscarDepto(nombre: string, centroGestor: string): Promise<void>
    {
        const buscarDepto = await this.depto.findOne({nombre, centroGestor}).exec();
        if (buscarDepto)
        {
            throw new NotAcceptableException('El documento tiene campos duplicados', 'Departamentos');
        }
    }

    async deptoPorId(_id: string): Promise<IDepto>
    {
        return this.depto.findById(new ObjectId(_id)).exec();
    }
}
