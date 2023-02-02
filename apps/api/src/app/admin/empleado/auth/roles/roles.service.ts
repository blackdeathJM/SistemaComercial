import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CrearRolDto, RolesAsigDto, RolesDto, RolesType} from '#api/libs/models/src/lib/admin/empleado/auth/roles.dto';
import {Model} from 'mongoose';

@Injectable()
export class RolesService
{
    constructor(@InjectModel(RolesDto.name) private roles: Model<RolesType>)
    {
    }

    async crearRoles(args: CrearRolDto): Promise<RolesDto>
    {
        try
        {
            const buscarIdEmpleado = await this.rolesAsig({idEmpleado: args.idEmpleado});
            if (buscarIdEmpleado)
            {
                return null;
            }

            return await this.roles.create(args);
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    // async actRoles(args: any): Promise<RolesDto>
    // {
    //     try
    //     {
    //         if (true)
    //         {
    //             await this.roles.findByIdAndUpdate('', {$set:{'roles'}}).exec();
    //             return null
    //         } else
    //         {
    //         }
    //     } catch (e)
    //     {
    //
    //     }
    // }

    async rolesAsig(idEmpleado: RolesAsigDto): Promise<RolesDto>
    {
        try
        {
            return await this.roles.findOne({idEmpleado: idEmpleado.idEmpleado}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }
}
