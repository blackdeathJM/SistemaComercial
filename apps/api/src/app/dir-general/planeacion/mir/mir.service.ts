import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {MirDto, MirType} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {Model} from 'mongoose';
import {ObtenerMirsDto, AgregarMirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir-consultas.dto';
import fs from 'fs-extra';
import {join} from 'path';

@Injectable()
export class MirService
{
    #archivo = join(__dirname, '/assets/centroGestor.txt');

    constructor(@InjectModel(MirDto.name) private mir: Model<MirType>)
    {
    }

    async mirs(args: ObtenerMirsDto): Promise<MirDto>
    {
        try
        {
            return await this.mir.findOne({ano: args.ano}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async agregarMir(input: AgregarMirDto): Promise<MirDto>
    {
        try
        {
            return await this.mir.create(input);
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }
}
