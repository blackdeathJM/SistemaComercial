import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ActRolesDto, CrearRolDto, RolesAsigDto, RolesDto, RolesType} from '#api/libs/models/src/lib/admin/empleado/auth/roles.dto';
import {Model} from 'mongoose';
import {AuthService} from '@api-admin/auth.service';
import {subRoles} from '@api-admin/auth.resolver';

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
                return await this.roles.findOneAndReplace({idEmpleado: args.idEmpleado}, {roles: args.roles}, {new: true}).exec();
            } else
            {
                return await this.roles.create(args);
            }
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async actPrimerNivel(role: ActRolesDto): Promise<RolesDto>
    {
        try
        {
            // Actualizamos la lista de roles que se encuentra en la collecion Roles
            const respuesta = await this.roles.findByIdAndUpdate(role._id,
                {$set: {'roles.$[grupo].children.$[rutaSec].acceso': role.acceso, 'roles.$[grupo].children.$[rutaSec].puedeAsigPermisos': role.puedeAsigPermisos}},
                {arrayFilters: [{'grupo.id': role.idRutaPrincipal}, {'rutaSec.id': role.idRutaSecundaria}], new: true}).exec();
            // si la respuesta es satisfactoria comparamos el acceso que biene del cliente si es true lo agregamos al array y si es false lo sacamos del array
            if (!respuesta)
            {
                return null;
            }
            const empleado = await this.authService.asigPermisos(role.acceso, role.idRutaSecundaria, respuesta.idEmpleado);
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return respuesta;
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async actCtrlPrimerNivel(ctrl: ActRolesDto): Promise<RolesDto>
    {
        try
        {
            const respuesta = await this.roles.findByIdAndUpdate(ctrl._id,
                {$set: {'roles.$[grupo].children.$[rutaSec].controles.$[ctrl].activo': ctrl.accesoCtrl}},
                {arrayFilters: [{'grupo.id': ctrl.idRutaPrincipal}, {'rutaSec.id': ctrl.idRutaSecundaria}, {'ctrl.id': ctrl.idCtrl}]}).exec();
            if (!respuesta._id)
            {
                return null;
            }
            const empleado = await this.authService.asigCtrls(respuesta.idEmpleado, ctrl.idCtrl, ctrl.accesoCtrl);
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return respuesta;
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async actSegundoNivel(role: ActRolesDto): Promise<RolesDto>
    {
        try
        {
            const resp = await this.roles.findByIdAndUpdate(role._id,
                {$set: {'roles.$[grupo].children.$[exp].children.$[ruta].acceso': role.acceso, 'roles.$[grupo].children.$[exp].children.$[ruta].puedeAsigPermisos': role.puedeAsigPermisos}},
                {arrayFilters: [{'grupo.id': role.idRutaPrincipal}, {'exp.id': role.idRutaSecundaria}, {'ruta.id': role.idRutaTreciaria}], new: true}).exec();
            if (!resp)
            {
                return null;
            }
            const empleado = await this.authService.asigPermisos(role.acceso, role.idRutaTreciaria, resp.idEmpleado);
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async actCtrlSegundoNivel(ctrl: ActRolesDto): Promise<RolesDto>
    {
        try
        {
            const resp = await this.roles.findByIdAndUpdate(ctrl._id,
                {$set: {'roles.$[grupo].children.$[exp].children.$[ruta].controles.$[ctrl].activo': ctrl.accesoCtrl}},
                {arrayFilters: [{'grupo.id': ctrl.idRutaPrincipal}, {'exp.id': ctrl.idRutaSecundaria}, {'ruta.id': ctrl.idRutaTreciaria}, {'ctrl.id': ctrl.idCtrl}]}).exec();
            if (!resp)
            {
                return null;
            }
            const empleado = await this.authService.asigCtrls(resp.idEmpleado, ctrl.idCtrl, ctrl.accesoCtrl);
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return resp;
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async actTercerNivel(role: ActRolesDto): Promise<RolesDto>
    {
        try
        {
            const resp = await this.roles.findByIdAndUpdate(role._id,
                {
                    $set: {
                        'roles.$[grupo].children.$[exp].children.$[ruta].children.$[subRuta].acceso': role.acceso,
                        'roles.$[grupo].children.$[exp].children.$[ruta].children.$[subRuta].puedeAsigPermisos': role.puedeAsigPermisos
                    }
                },
                {arrayFilters: [{'grupo.id': role.idRutaPrincipal}, {'exp.id': role.idRutaSecundaria}, {'ruta.id': role.idRutaTreciaria}, {'subRuta.id': role.idRutaCuarta}], new: true});
            if (!resp._id)
            {
                return null;
            }
            const empleado = await this.authService.asigPermisos(role.acceso, role.idRutaCuarta, resp.idEmpleado);
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return resp;
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async actCtrlTercerNivel(ctrl: ActRolesDto): Promise<RolesDto>
    {
        try
        {
            const resp = await this.roles.findByIdAndUpdate(ctrl._id,
                {$set: {'roles.$[grupo].children.$[exp].children.$[ruta].children.$[subRuta].controles.$[ctrl].activo': ctrl.accesoCtrl}},
                {
                    arrayFilters: [{'grupo.id': ctrl.idRutaPrincipal}, {'exp.id': ctrl.idRutaSecundaria}, {'ruta.id': ctrl.idRutaTreciaria}, {'subRuta.id': ctrl.idRutaCuarta},
                        {'ctrl.id': ctrl.idCtrl}], new: true
                }).exec();
            if (!resp)
            {
                return null;
            }
            const empleado = await this.authService.asigCtrls(resp.idEmpleado, ctrl.idCtrl, ctrl.accesoCtrl);
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return resp;
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
