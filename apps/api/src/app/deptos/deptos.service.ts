import {Injectable} from '@nestjs/common';
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
}
