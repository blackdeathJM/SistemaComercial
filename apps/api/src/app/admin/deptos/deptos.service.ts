import {ConflictException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {DeptoDto, DeptoType} from '#api/libs/models/src/lib/admin/deptos/depto.dto';
import {IDepto} from '#api/libs/models/src/lib/admin/deptos/depto.interface';
import {environment} from '@api-environments:/environment';


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

    async actualizarDepto(input: DeptoDto): Promise<IDepto>
    {
        try
        {
            return await this.depto.findByIdAndUpdate(input._id, {...input}, {returnOriginal: false}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }

    }

    async eliminarDepto(_id: string): Promise<IDepto>
    {
        try
        {
            return await this.depto.findByIdAndDelete(_id).exec();
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }
    }

    async deptoPorId(_id: string): Promise<IDepto>
    {
        return this.depto.findById(_id).exec();
    }
}
