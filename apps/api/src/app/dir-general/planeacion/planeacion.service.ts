import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {PlaneacionDto, PlaneacionType} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {Model} from 'mongoose';
import {MirCuestionarioDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';

@Injectable()
export class PlaneacionService
{
    constructor(@InjectModel(PlaneacionDto.name) private planeacion: Model<PlaneacionType>)
    {
    }

    async regPlaneacion(planeacion: PlaneacionDto): Promise<PlaneacionDto>
    {
        try
        {
            return new this.planeacion(planeacion).save();
        } catch (e)
        {
            throw new InternalServerErrorException(e);
        }
    }

    async regMir(mir: MirCuestionarioDto): Promise<MirCuestionarioDto>
    {
        try
        {
            return await this.planeacion.findOneAndUpdate();
        } catch (e)
        {
            throw new InternalServerErrorException(e);
        }

    }
}
