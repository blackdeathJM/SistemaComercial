import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ActInstDto, AgregarBombaDto, AgregarMotorDto, RegInstalacionDto, TelemetriaDto, TelemetriaType, unionTele} from '#api/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.dto';
import {Model} from 'mongoose';
import {TomarMedicionDto} from '#api/libs/models/src/lib/tecnica-operativa/telemetria/instalacion/instalacion.dto';

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
            throw new InternalServerErrorException({message: e});
        }
    }

    async crearRegLectura(args: TomarMedicionDto): Promise<typeof unionTele>
    {
        const {_id, esDinamico, ...resto} = args;
        try
        {
            if (esDinamico)
            {
                const buscarNivelDinamico = await this.telemetria.findOne({_id, 'instalacion.nivelDinamico': {$elemMatch: {ano: resto.ano}}});
                if (buscarNivelDinamico)
                {
                    return {
                        exito: false,
                        error: 'El valor ya ha sido inicializado'
                    };
                }
                return await this.telemetria.findByIdAndUpdate(_id, {$push: {'instalacion.nivelDinamico': resto}}, {new: true}).exec();
            } else
            {
                const buscarNivelEstatico = await this.telemetria.findOne({_id, 'instalacion.nivelEstatico': {$elemMatch: {ano: resto.ano}}});
                if (buscarNivelEstatico)
                {
                    return {
                        exito: false,
                        error: 'El valor ya ha sido inicializado'
                    };
                }
                return await this.telemetria.findByIdAndUpdate(_id, {$push: {'instalacion.nivelEstatico': resto}}, {new: true}).exec();
            }
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async actLectura(args: TomarMedicionDto): Promise<TelemetriaDto>
    {
        const {_id, esDinamico, ...resto} = args;
        try
        {
            if (esDinamico)
            {
                return await this.telemetria.findByIdAndUpdate(_id, {$set: {'instalacion.nivelDinamico': resto}}, {new: true}).exec();
            } else
            {
                return await this.telemetria.findByIdAndUpdate(_id, {$set: {'instalacion.nivelEstatico': resto}}, {new: true}).exec();
            }
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async actInst(args: ActInstDto): Promise<TelemetriaDto>
    {
        try
        {
            return await this.telemetria.findByIdAndUpdate(args._id, {$set: {instalacion: args.instalacion}}, {new: true}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async agregarMotor(args: AgregarMotorDto): Promise<TelemetriaDto>
    {
        try
        {
            return await this.telemetria.findByIdAndUpdate(args._id, {$push: {motores: args.motores}}, {new: true}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async agregarBomba(args: AgregarBombaDto): Promise<TelemetriaDto>
    {
        try
        {
            return await this.telemetria.findByIdAndUpdate(args._id, {$push: {bombas: args.bombas}}, {new: true}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async regInstalacion(reg: RegInstalacionDto): Promise<typeof unionTele>
    {
        try
        {
            return await this.telemetria.create(reg);
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

}
