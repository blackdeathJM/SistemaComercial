import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {PbrDto, PbrType} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {PbrPorAno} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr-consultas.dto';

@Injectable()
export class PbrService
{
    constructor(@InjectModel(PbrDto.name) private pbr: Model<PbrType>)
    {
    }

    async pbrs(args: PbrPorAno): Promise<PbrDto>
    {
        try
        {
            return await this.pbr.findOne({ano: args.ano}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }
}
