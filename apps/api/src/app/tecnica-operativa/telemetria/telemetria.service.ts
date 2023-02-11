import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {RegInstalacionDto, TelemetriaDto, TelemetriaType} from '#api/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.dto';
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

    async regInstalacion(reg: RegInstalacionDto): Promise<TelemetriaDto>
    {
        try
        {
            return await this.telemetria.create({...reg});
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }
}
