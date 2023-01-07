import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {EmpleadoDto, EmpleadoType} from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {AuthDto} from '#api/libs/models/src/lib/admin/empleado/auth/auth.dto';
import {IEmpleado} from '#api/libs/models/src/lib/admin/empleado/empleado.interface';
import {CambioContrsenaDto} from '#api/libs/models/src/lib/admin/empleado/auth/auth.input.dto';
import {DatosSesionDto, ILoginRespuesta} from '#api/libs/models/src/lib/admin/empleado/auth/login.dto';
import {IDatosSesion} from '#api/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {ModificadoPorDto} from '#api/libs/models/src/lib/common/common.dto';

@Injectable()
export class AuthService
{
    salt = 10;

    constructor(@InjectModel(EmpleadoDto.name) private empleado: Model<EmpleadoType>, private jwtService: JwtService)
    {
    }

    async asignarAuth(_id: string, auth: AuthDto, modificadoPor: ModificadoPorDto): Promise<IEmpleado>
    {
        const contrasena = auth.contrasena;
        auth.contrasena = await bcrypt.hash(contrasena, this.salt);
        try
        {
            return await this.empleado.findByIdAndUpdate(_id, {$set: {auth}, $push: {modificadoPor}}, {returnOriginal: false, runValidators: true}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async actualizarContrasenaAdmin(datos: CambioContrsenaDto, modificadoPor: ModificadoPorDto): Promise<IEmpleado>
    {
        const nvaContrasena = await bcrypt.hash(datos.contrasena, this.salt);
        try
        {
            return await this.empleado.findByIdAndUpdate(datos._id,
                {$set: {'auth.contrasena': nvaContrasena}, $push: {modificadoPor}}, {returnOriginal: false}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async validarUsuario(username: string, password: string): Promise<EmpleadoDto>
    {
        try
        {
            const empleado = await this.empleado.findOne({'auth.usuario': username}).exec();
            const validar = await bcrypt.compare(password, empleado.auth.contrasena);
            if (validar)
            {
                delete empleado.auth.contrasena;
                return empleado;
            }
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    // async actualizarRol(_id: string, rol: RolDto, modificadoPor: ModificadoDto): Promise<IEmpleado>
    // {
    //     const empleado = await this.empleado.findByIdAndUpdate(_id, {$set: {'auth.rol.$[i].tipoAcceso': rol.tipoAcceso, 'auth.rol.$[i].oculto': rol.oculto}}, {
    //         arrayFilters: [{'i.id': {$eq: rol.id}}], returnOriginal: false
    //     });
    //
    //     if (!empleado)
    //     {
    //         throw new NotFoundException({message: 'El usuario no fue encontrado'});
    //     }
    //     await this.modificadoPor(_id, modificadoPor);
    //     return empleado;
    // }

    login(empleado: any): ILoginRespuesta
    {
        console.log('login', empleado);
        return this.datosSesion(empleado);
    }

    async actualizarAvatar(_id: string, url: string): Promise<ILoginRespuesta>
    {
        try
        {
            const rutaImg = await this.empleado.findByIdAndUpdate(_id, {$set: {avatar: url}}, {new: true}).exec();
            return this.datosSesion(rutaImg);
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async validarToken(token: string): Promise<DatosSesionDto>
    {
        try
        {
            const validacion: IDatosSesion = await this.jwtService.verify(token);
            return await this.empleado.findById(validacion._id).exec();
        } catch (e)
        {
            throw new NotFoundException({message: 'Token no valido'});
        }

    }

    private datosSesion(empleado: IEmpleado): ILoginRespuesta
    {
        const datosSesion: IDatosSesion =
            {
                _id: empleado._id,
                avatar: empleado.avatar,
                nombreCompleto: empleado.nombreCompleto,
                activo: empleado.activo,
                auth: empleado.auth,
                deptoId: empleado.deptoId
            };
        return {
            token: this.jwtService.sign(datosSesion),
            datosSesion
        };
    }
}
