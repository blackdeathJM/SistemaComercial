import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {TelemetriaDto, TelemetriaType} from '#api/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.dto';
import {Model} from 'mongoose';

@Injectable()
export class TelemetriaService
{
    constructor(@InjectModel(TelemetriaDto.name) private telemetria: Model<TelemetriaType>)
    {
    }

    async instalaciones(): Promise<TelemetriaDto[]>
    {
        try
        {
            return await this.telemetria.find().exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }
}
