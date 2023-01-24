import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {DeptoDto, DeptoType, RegPuestoDto} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.dto';

@Injectable()
export class DeptosService
{
    constructor(@InjectModel(DeptoDto.name) private depto: Model<DeptoType>)
    {
    }

    async deptos(): Promise<DeptoDto[]>
    {
        try
        {
            // await this.depto.updateMany({}, {$set: {puestos: []}}).exec();
            return await this.depto.find().exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: 'Error al consutar los departamentos'});
        }
    }

    async filtrarDeptos(nombre: string): Promise<DeptoDto[]>
    {
        try
        {
            return await this.depto.find({nombre: {$regex: nombre, $options: 'i'}}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: 'Error al consultar los departamentos'});
        }
    }

    async crearDepto(input: DeptoDto): Promise<DeptoDto>
    {
        try
        {
            return await this.depto.create(input);
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }
    }

    async agregarPuesto(puesto: RegPuestoDto): Promise<DeptoDto>
    {
        try
        {
            return await this.depto.findByIdAndUpdate(puesto._id, {$push: {puestos: puesto.puesto}}, {new: true}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async actualizarDepto(input: DeptoDto): Promise<DeptoDto>
    {
        try
        {
            return await this.depto.findByIdAndUpdate(input._id, {...input}, {new: true}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }

    }

    async eliminarDepto(_id: string): Promise<DeptoDto>
    {
        try
        {
            return await this.depto.findByIdAndDelete(_id).exec();
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }
    }

    async deptoPorId(_id: string): Promise<DeptoDto>
    {
        return this.depto.findById(_id).exec();
    }
}
