import {Injectable} from '@nestjs/common';

@Injectable()
export class PbrService
{
    // constructor(@InjectModel(PbrDto.name) private pbr: Model<PbrType>)
    // {
    // }
    //
    // async pbrs(args: PbrsDto): Promise<PbrDto[]>
    // {
    //     try
    //     {
    //         const consulta = {ano: args.ano};
    //         if (args.idEmpleado !== 'noAplica')
    //         {
    //             Object.assign(consulta, {idEmpleado: args.idEmpleado});
    //             return await this.pbr.find(consulta).exec();
    //         }
    //         Object.assign(consulta, {centroGestor: args.centroGestor});
    //         return await this.pbr.find(consulta).exec();
    //     } catch (e)
    //     {
    //         throw new InternalServerErrorException({message: e});
    //     }
    // }
    //
    // async regPbr(input: RegPbrDto): Promise<PbrDto>
    // {
    //     const ejercicio: TEjercicio =
    //         {
    //             ano: input.ano,
    //             enero: 0.00,
    //             febrero: 0.00,
    //             marzo: 0.00,
    //             abril: 0.00,
    //             mayo: 0.00,
    //             junio: 0.00,
    //             julio: 0.00,
    //             agosto: 0.00,
    //             septiembre: 0.00,
    //             octubre: 0.00,
    //             noviembre: 0.00,
    //             diciembre: 0.00,
    //             total: 0.00,
    //             trim1: 0.00,
    //             trim2: 0.00,
    //             trim3: 0.00,
    //             trim4: 0.00,
    //             forEnero: null,
    //             forFebrero: null,
    //             forMarzo: null,
    //             forAbril: null,
    //             forMayo: null,
    //             forJunio: null,
    //             forJulio: null,
    //             forAgosto: null,
    //             forSeptiembre: null,
    //             forOctubre: null,
    //             forNoviembre: null,
    //             forDiciembre: null
    //         };
    //
    //     const reg =
    //         {
    //             ...input,
    //             ejercicio,
    //         };
    //
    //     try
    //     {
    //         return await this.pbr.create(reg);
    //     } catch (e)
    //     {
    //         throw new InternalServerErrorException({message: e});
    //     }
    // }

    // async pbrId(_id: string): Promise<PbrDto>
    // {
    //     try
    //     {
    //         return await this.pbr.findById(_id).exec();
    //     } catch (e)
    //     {
    //         throw new InternalServerErrorException({message: e});
    //     }
    // }
}
