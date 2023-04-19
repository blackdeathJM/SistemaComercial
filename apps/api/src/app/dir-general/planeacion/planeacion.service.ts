import {PlaneacionDto, PlaneacionType, IniPlaneacionDto} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {Model} from 'mongoose';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class PlaneacionService
{
    constructor(@InjectModel(PlaneacionDto.name) private planeacion: Model<PlaneacionType>)
    {
    }

    async filTodos(): Promise<PlaneacionDto[]>
    {
        try
        {
            return await this.planeacion.find({}, {}, {sort: {ano: -1}}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException(e);
        }
    }

    async inicializarPlaneacion(planeacion: IniPlaneacionDto): Promise<PlaneacionDto>
    {
        try
        {
            console.log(planeacion);
            // return new this.planeacion(planeacion).save();
            return null;
        } catch (e)
        {
            throw new InternalServerErrorException(e);
        }
    }

    // async regMir(mir: MirCuestionarioDto): Promise<MirCuestionarioDto>
    // {
    //     try
    //     {
    //         return await this.planeacion.findOneAndUpdate();
    //     } catch (e)
    //     {
    //         throw new InternalServerErrorException(e);
    //     }
    // }

    // async regPbr(): Promise<PlaneacionDto>
    // {
    //
    // }
}
