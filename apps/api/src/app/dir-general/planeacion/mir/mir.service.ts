import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {MirDto, MirType} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {Model} from 'mongoose';
import {MirsPorCentroGestorDto, MirsPorAnoDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir-consultas.dto';

@Injectable()
export class MirService
{
    // #archivo = join(__dirname, '/assets/centroGestor.txt');

    constructor(@InjectModel(MirDto.name) private mir: Model<MirType>)
    {
    }
    async agregarMir(input: MirDto): Promise<MirDto>
    {
        try
        {
            return await this.mir.create(input);
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }
    async mirsPorAno(args: MirsPorAnoDto): Promise<MirDto[]>
    {
        try
        {
            return await this.mir.find({ano: args.ano}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async mirsPorCentroGestor(args: MirsPorCentroGestorDto): Promise<MirDto[]>
    {
        try
        {
            return await this.mir.find({ano: args.ano, centroGestor: args.centroGestor}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }
}
