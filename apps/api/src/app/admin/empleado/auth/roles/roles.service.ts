import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CrearRolDto, RolesAsigDto, RolesDto, RolesType} from '#api/libs/models/src/lib/admin/empleado/auth/roles.dto';
import {Model} from 'mongoose';

@Injectable()
export class RolesService
{
    constructor(@InjectModel(RolesDto.name) private roles: Model<RolesType>)
    {
    }

    async crearRoles(roles: CrearRolDto): Promise<RolesDto>
    {
        try
        {
            const buscarIdEmpleado = await this.rolesAsig({idEmpleado: roles.idEmpleado});
            if (!buscarIdEmpleado)
            {
                return null;
            }
            return await this.roles.create(roles);
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

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
