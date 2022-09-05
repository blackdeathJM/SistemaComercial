import {Injectable, NotAcceptableException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ObjectId} from 'bson';
import {IDepto} from '@sistema-comercial/modelos/depto.interface';
import {DeptoDto, DeptoType} from '@sistema-comercial/modelos/depto.dto';
import {AppService} from '../../app.service';


@Injectable()
export class DeptosService
{
    constructor(@InjectModel(DeptoDto.name) private depto: Model<DeptoType>, private mongoErrorService: AppService)
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
        try
        {
            return await depto.save();
        } catch (e)
        {
            this.mongoErrorService.duplicadoMongo(e);
        }
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

    async buscarDepto(nombre: string, centroGestor: string): Promise<void | NotAcceptableException>
    {
        const buscarDepto = await this.depto.findOne({nombre, centroGestor}).exec();
        if (buscarDepto)
        {
            console.log('buscar depto', buscarDepto);
            throw new NotAcceptableException('El documento tiene campos duplicados', 'Departamentos');
        }
    }

    async deptoPorId(_id: string): Promise<IDepto>
    {
        return this.depto.findById(new ObjectId(_id)).exec();
    }
}
