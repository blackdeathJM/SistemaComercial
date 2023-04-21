import {PlaneacionDto, TPlaneacionType} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class PlaneacionService
{
    constructor(@InjectModel(PlaneacionDto.name) private planeacion: Model<TPlaneacionType>)
    {
    }

    async filTodos(): Promise<PlaneacionDto[]>
    {
        return await this.planeacion.find({}, {}, {sort: {ano: -1}}).exec();
    }

    async filPorAno(_id: string): Promise<PlaneacionDto>
    {
        return await this.planeacion.findById(_id).exec();
    }

    async inicializarPlaneacion(planeacion: PlaneacionDto): Promise<PlaneacionDto>
    {
        if (planeacion._id)
        {
            const copia = await this.planeacion.findById(planeacion._id).exec();
            const nvaInicializacion: TPlaneacionType = {
                _id: null,
                ano: new Date().getFullYear(),
                copia: true,
                descripcion: planeacion.descripcion,
                mirCuestionario: copia.mirCuestionario,
                pbrCuestionario: copia.pbrCuestionario
            };
            return new this.planeacion(nvaInicializacion).save();
        } else
        {
            return new this.planeacion(planeacion).save();
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
