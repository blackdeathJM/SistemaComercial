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
                return await this.roles.findOneAndUpdate({idEmpleado: args.idEmpleado}, {$set: {roles: args.roles}}, {new: true}).exec();
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
        const session = await this.roles.db.startSession();
        await session.startTransaction();
        try
        {
            // Actualizamos la lista de roles que se encuentra en la collecion Roles
            const respuesta = await this.roles.findByIdAndUpdate(role._id, {$set: {'roles.$[grupo].children.$[rutaSec].acceso': role.acceso}},
                {arrayFilters: [{'grupo.id': role.idRutaPrincipal}, {'rutaSec.id': role.idRutaSecundaria}], new: true}).session(session).exec();
            // si la respuesta es satisfactoria comparamos el acceso que biene del cliente si es true lo agregamos al array y si es false lo sacamos del array
            const empleado = await this.authService.permisoRuta(role.acceso, role.idRutaSecundaria, respuesta.idEmpleado, session);
            await session.commitTransaction();
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return respuesta;
        } catch (e)
        {
            await session.abortTransaction();
            throw new InternalServerErrorException({message: e.codeName});
        } finally
        {
            await session.endSession();
        }
    }

    async asigPermisoPrimerNivel(asig: ActRolesDto): Promise<RolesDto>
    {
        const session = await this.roles.db.startSession();
        try
        {
            session.startTransaction();
            const resp = await this.roles.findByIdAndUpdate(asig._id, {$set: {'roles.$[grupo].children.$[rutaSec].puedeAsigPermisos': asig.acceso}},
                {arrayFilters: [{'grupo.id': asig.idRutaPrincipal}, {'rutaSec.id': asig.idRutaSecundaria}], new: true}).session(session).exec();
            const empleado = await this.authService.asigPermisos(resp.idEmpleado, asig.idRutaSecundaria, asig.acceso, session);
            await session.commitTransaction();
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return resp;
        } catch (e)
        {
            await session.abortTransaction();
            throw new InternalServerErrorException({message: e});
        } finally
        {
            await session.endSession();
        }
    }

    async actCtrlPrimerNivel(ctrl: ActRolesDto): Promise<RolesDto>
    {
        const session = await this.roles.db.startSession();
        try
        {
            session.startTransaction();
            const respuesta = await this.roles.findByIdAndUpdate(ctrl._id,
                {$set: {'roles.$[grupo].children.$[rutaSec].controles.$[ctrl].activo': ctrl.accesoCtrl}},
                {arrayFilters: [{'grupo.id': ctrl.idRutaPrincipal}, {'rutaSec.id': ctrl.idRutaSecundaria}, {'ctrl.id': ctrl.idCtrl}], new: true}).session(session).exec();
            const empleado = await this.authService.asigCtrls(respuesta.idEmpleado, ctrl.idCtrl, ctrl.accesoCtrl, session);
            await session.commitTransaction();
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return respuesta;
        } catch (e)
        {
            await session.abortTransaction();
            throw new InternalServerErrorException({message: e.codeName});
        } finally
        {
            await session.endSession();
        }
    }

    async actSegundoNivel(role: ActRolesDto): Promise<RolesDto>
    {
        const session = await this.roles.db.startSession();
        try
        {
            session.startTransaction();
            const resp = await this.roles.findByIdAndUpdate(role._id,
                {$set: {'roles.$[grupo].children.$[exp].children.$[ruta].acceso': role.acceso}},
                {arrayFilters: [{'grupo.id': role.idRutaPrincipal}, {'exp.id': role.idRutaSecundaria}, {'ruta.id': role.idRutaTreciaria}], new: true}).session(session).exec();
            const empleado = await this.authService.permisoRuta(role.acceso, role.idRutaTreciaria, resp.idEmpleado, session);
            await session.commitTransaction();
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return resp;
        } catch (e)
        {
            await session.abortTransaction();
            throw new InternalServerErrorException({message: e.codeName});
        } finally
        {
            await session.endSession();
        }
    }

    async asigPermisoSegNivel(asig: ActRolesDto): Promise<RolesDto>
    {
        const session = await this.roles.db.startSession();
        try
        {
            session.startTransaction();
            const resp = await this.roles.findByIdAndUpdate(asig._id, {$set: {'roles.$[grupo].children.$[exp].children.$[ruta].puedeAsigPermisos': asig.acceso}},
                {arrayFilters: [{'grupo.id': asig.idRutaPrincipal}, {'exp.id': asig.idRutaSecundaria}, {'ruta.id': asig.idRutaTreciaria}], new: true}).session(session).exec();
            const empleado = await this.authService.asigPermisos(resp.idEmpleado, asig.idRutaTreciaria, asig.acceso, session);
            await session.commitTransaction();
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return resp;
        } catch (e)
        {
            await session.abortTransaction();
            throw new InternalServerErrorException({message: e.codeName});
        } finally
        {
            await session.endSession();
        }
    }

    async actCtrlSegundoNivel(ctrl: ActRolesDto): Promise<RolesDto>
    {
        const session = await this.roles.db.startSession();
        try
        {
            session.startTransaction();
            const resp = await this.roles.findByIdAndUpdate(ctrl._id,
                {$set: {'roles.$[grupo].children.$[exp].children.$[ruta].controles.$[ctrl].activo': ctrl.accesoCtrl}},
                {arrayFilters: [{'grupo.id': ctrl.idRutaPrincipal}, {'exp.id': ctrl.idRutaSecundaria}, {'ruta.id': ctrl.idRutaTreciaria}, {'ctrl.id': ctrl.idCtrl}], new: true})
                .session(session).exec();
            const empleado = await this.authService.asigCtrls(resp.idEmpleado, ctrl.idCtrl, ctrl.accesoCtrl, session);
            await session.commitTransaction();
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return resp;
        } catch (e)
        {
            await session.abortTransaction();
            throw new InternalServerErrorException({message: e.codeName});
        } finally
        {
            await session.endSession();
        }
    }

    async actTercerNivel(role: ActRolesDto): Promise<RolesDto>
    {
        const session = await this.roles.db.startSession();
        // const sesion = await this.roles.startSession();
        try
        {
            session.startTransaction();
            const resp = await this.roles.findByIdAndUpdate(role._id,
                {$set: {'roles.$[grupo].children.$[exp].children.$[ruta].children.$[subRuta].acceso': role.acceso}},
                {
                    arrayFilters: [{'grupo.id': role.idRutaPrincipal}, {'exp.id': role.idRutaSecundaria}, {'ruta.id': role.idRutaTreciaria}, {'subRuta.id': role.idRutaCuarta}],
                    new: true
                }).session(session).exec();
            const empleado = await this.authService.permisoRuta(role.acceso, role.idRutaCuarta, resp.idEmpleado, session);
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return resp;
        } catch (e)
        {
            await session.abortTransaction();
            throw new InternalServerErrorException({message: e.codeName});
        } finally
        {
            await session.endSession();
        }
    }

    async asigPermisoTercerNivel(asig: ActRolesDto): Promise<RolesDto>
    {
        const session = await this.roles.db.startSession();
        try
        {
            session.startTransaction();
            const resp = await this.roles.findByIdAndUpdate(asig._id,
                {$set: {'roles.$[grupo].children.$[exp].children.$[ruta].children.$[subRuta].puedeAsigPermisos': asig.acceso}},
                {
                    arrayFilters: [{'grupo.id': asig.idRutaPrincipal}, {'exp.id': asig.idRutaSecundaria}, {'ruta.id': asig.idRutaTreciaria}, {'subRuta.id': asig.idRutaCuarta}],
                    new: true
                }).session(session).exec();
            const empleado = await this.authService.asigPermisos(resp.idEmpleado, asig.idRutaCuarta, asig.acceso, session);
            await session.commitTransaction();
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return resp;
        } catch (e)
        {
            await session.abortTransaction();
            throw new InternalServerErrorException({message: e.codeName});
        } finally
        {
            await session.endSession();
        }
    }

    async actCtrlTercerNivel(ctrl: ActRolesDto): Promise<RolesDto>
    {
        const session = await this.roles.db.startSession();
        try
        {
            session.startTransaction();
            const resp = await this.roles.findByIdAndUpdate(ctrl._id,
                {$set: {'roles.$[grupo].children.$[exp].children.$[ruta].children.$[subRuta].controles.$[ctrl].activo': ctrl.accesoCtrl}},
                {
                    arrayFilters: [{'grupo.id': ctrl.idRutaPrincipal}, {'exp.id': ctrl.idRutaSecundaria}, {'ruta.id': ctrl.idRutaTreciaria}, {'subRuta.id': ctrl.idRutaCuarta},
                        {'ctrl.id': ctrl.idCtrl}], new: true
                }).session(session).exec();
            const empleado = await this.authService.asigCtrls(resp.idEmpleado, ctrl.idCtrl, ctrl.accesoCtrl, session);
            await session.commitTransaction();
            await subRoles.publish('rolCambiado', this.authService.datosSesion(empleado));
            return resp;
        } catch (e)
        {
            await session.abortTransaction();
            throw new InternalServerErrorException({message: e.codeName});
        } finally
        {
            await session.endSession();
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
