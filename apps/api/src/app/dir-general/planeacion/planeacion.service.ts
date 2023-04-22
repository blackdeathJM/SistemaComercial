import {PlaneacionDto, TPlaneacionType} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {MirCuestionarioDto, RegMirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';

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

    async regMir(datos: RegMirDto): Promise<PlaneacionDto>
    {
        console.log(datos)
        // const {_id, esActualizar, ...resto} = datos;
        // return await this.planeacion.findOneAndUpdate({_id, mirCuestionario: {$elemMatch: {idIndicador: resto.idIndicador}}},
        //     {$set: {'mirCuestionario.$': resto}, $addToSet: {mirCuestionario: resto}}, {upsert: true}).exec();

        return null;

    }

    // async regPbr(): Promise<PlaneacionDto>
    // {
    //
    // }
}
