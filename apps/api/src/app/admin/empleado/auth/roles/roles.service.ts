import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ActRolesDto, CrearRolDto, RolesAsigDto, RolesDto, RolesType} from '#api/libs/models/src/lib/admin/empleado/auth/roles.dto';
import {Model} from 'mongoose';
import {AuthService} from '@api-admin/auth.service';

@Injectable()
export class RolesService
{
    constructor(@InjectModel(RolesDto.name) private roles: Model<RolesType>, private authService: AuthService)
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

    async actPrimerNivel(role: ActRolesDto): Promise<boolean>
    {
        try
        {
            // Actualizamos la lista de roles que se encuentra en la collecion Roles
            const respuesta = await this.roles.findByIdAndUpdate(role._id, {$set: {'roles.$[role].children.$[rutaSec].acceso': role.acceso}},
                {arrayFilters: [{'role.id': role.idRutaPrincipal}, {'rutaSec.id': role.idRutaSecundaria}]}).exec();
            // si la respuesta es satisfactoria comparamos el acceso que biene del cliente si es true lo agregamos al array y si es false lo sacamos del array
            if (respuesta._id)
            {
                await this.authService.permisosPrimerNivel(role.acceso, role.idRutaSecundaria, respuesta.idEmpleado);
            }
            return true;
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async actSegundoNivel(role: ActRolesDto): Promise<boolean>
    {
        try
        {
            await this.roles.findByIdAndUpdate(role._id, {$set: {'roles.$[grupo].children.$[exp].children.$[ruta].acceso': role.acceso}},
                {arrayFilters: [{'grupo.id': role.idRutaPrincipal}, {'exp.id': role.idRutaSecundaria}, {'ruta.id': role.idRutaTreciaria}]}).exec();

            return true;
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
