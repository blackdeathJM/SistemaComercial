import {ConflictException, Injectable, NotAcceptableException} from '@nestjs/common';
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
            return await this.depto.findByIdAndUpdate(new ObjectId(input._id), {...input}, {returnOriginal: false}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }

    }

    async eliminarDepto(_id: string): Promise<IDepto>
    {
        try
        {
            return await this.depto.findByIdAndDelete(new ObjectId(_id)).exec();
        } catch (e)
        {
            throw new ConflictException({message: e.codeName})
        }
    }

    async deptoPorId(_id: string): Promise<IDepto>
    {
        return this.depto.findById(new ObjectId(_id)).exec();
    }
}
