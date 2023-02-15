import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ActInstDto, AgregarBombaDto, AgregarMotorDto, RegInstalacionDto, TelemetriaDto, TelemetriaType} from '#api/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.dto';
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

    async actInst(args: ActInstDto): Promise<TelemetriaDto>
    {
        try
        {
            return await this.telemetria.findByIdAndUpdate(args._id, {$set: {instalacion: args.instalacion}}, {new: true}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async agregarMotor(args: AgregarMotorDto): Promise<TelemetriaDto>
    {
        try
        {
            return await this.telemetria.findByIdAndUpdate(args._id, {$push: {motores: args.motores}}, {new: true}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async agregarBomba(args: AgregarBombaDto): Promise<TelemetriaDto>
    {
        try
        {
            return await this.telemetria.findByIdAndUpdate(args._id, {$push: {bombas: args.bombas}}, {new: true}).exec();
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
