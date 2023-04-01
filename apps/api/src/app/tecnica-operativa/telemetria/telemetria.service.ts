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
        const {_id, tipoNivel, ...resto} = args;
        const buscar = {_id, [tipoNivel]: {$elemMatch: {ano: resto.ano}}};
        const actualizacion = {[tipoNivel]: resto};
        try
        {
            //Realizamos una consulta para buscar algún registro que ya se haya inicializado y no tener registros duplicados pertenencientes al mismo año, ya que
            //al crear el registro se crea se crean todos los campos y solo se actualizan
            const reg = await this.telemetria.findOne(buscar).exec();
            if (reg)
            {
                return {
                    exito: false,
                    error: 'El valor ya ha sido inicializado'
                };
            }
            //Los registros nuevos de niveles se van asignando a un arreglo donde se estaran manejando por año y solo se iran agregando si el arreglo no tiene ano
            return await this.telemetria.findByIdAndUpdate(_id, {$push: actualizacion}, {new: true}).exec();
        } catch (e)
        {
            throw  new InternalServerErrorException({message: e});
        }
    }

    async actLectura(args: TomarMedicionDto): Promise<TelemetriaDto>
    {
        const {_id, tipoNivel, ...resto} = args;
        try
        {
            return await this.telemetria.findOneAndUpdate({_id, [tipoNivel]: {$elemMatch: {ano: resto.ano}}},
                {$set: {[tipoNivel + '.$']: resto}}, {new: true}).exec();
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
            return await this.telemetria.findByIdAndUpdate(args._id, {$push: {motores: args.motor}}, {new: true}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async agregarBomba(args: AgregarBombaDto): Promise<TelemetriaDto>
    {
        try
        {
            return await this.telemetria.findByIdAndUpdate(args._id, {$push: {bombas: args.bomba}}, {new: true}).exec();
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
