import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ObjectId} from 'bson';
import {ROLES_POR_DEFECTO} from './rol.model';
import {EmpleadoDto, EmpleadoType, ModificadoDto} from '@sistema-comercial/modelos/empleado.dto';
import {IEmpleado, IModificado} from '@sistema-comercial/modelos/empleado.interface';
import {AuthDto, RolDto} from '@sistema-comercial/modelos/auth/auth.dto';
import {CambioContrsenaDto} from '@sistema-comercial/modelos/auth/auth.input.dto';
import {ILoginRespuesta} from '@sistema-comercial/modelos/auth/login.dto';
import {IDatosSesion} from '@sistema-comercial/modelos/auth/auth.interface';

@Injectable()
export class AuthService
{
    salt = 10;

    constructor(@InjectModel(EmpleadoDto.name) private empleado: Model<EmpleadoType>, private jwtService: JwtService)
    {
    }

    async asignarAuth(_id: string, auth: AuthDto): Promise<IEmpleado | NotFoundException>
    {
        const contrasena = auth.contrasena;
        auth.contrasena = await bcrypt.hash(contrasena, this.salt);
        auth.rol = ROLES_POR_DEFECTO;

        const empleado = await this.empleado.findByIdAndUpdate(new ObjectId(_id), {$set: {auth}}, {returnOriginal: false, runValidators: true}).exec();
        if (!empleado)
        {
            throw new NotFoundException('El usuario no se encontro');
        }
        return empleado;
    }

    async actualizarContrasenaAdmin(datos: CambioContrsenaDto): Promise<IEmpleado | NotFoundException>
    {
        const nvaContrasena = await bcrypt.hash(datos.contrasena, this.salt);
        const empleado = await this.empleado.findByIdAndUpdate(new ObjectId(datos._id),
            {$set: {'auth.contrasena': nvaContrasena}}, {returnOriginal: false}).exec();
        if (!empleado)
        {
            throw new NotFoundException('No se encontro registro para actualizar la contrasena');
        }

        return empleado;
    }

    async validarUsuario(username: string, password: string): Promise<IEmpleado>
    {
        const empleado = await this.empleado.findOne({'auth.usuario': username}).exec();
        if (empleado)
        {
            const validar = await bcrypt.compare(password, empleado.auth.contrasena);
            if (validar)
            {
                delete empleado.auth.contrasena;
                return empleado;
            }

        } else
        {
            throw new NotFoundException({message: 'Usuario o contrasena no correctas'});
        }
        return null;
    }

    async actualizarRol(_id: string, rol: RolDto, modificadoPor: ModificadoDto): Promise<IEmpleado | NotFoundException>
    {
        const empleado = await this.empleado.findByIdAndUpdate(_id, {$set: {'auth.rol.$[i].tipoAcceso': rol.tipoAcceso, 'auth.rol.$[i].oculto': rol.oculto}}, {
            arrayFilters: [{'i.id': {$eq: rol.id}}], returnOriginal: false
        });

        if (!empleado)
        {
            throw new NotFoundException({message: 'El usuario no fue encontrado'});
        }
        await this.modificadoPor(_id, modificadoPor);
        return empleado;
    }

    async modificadoPor(_id: string, modificadoPor: IModificado): Promise<void>
    {
        await this.empleado.findByIdAndUpdate(_id, {$push: {modificadoPor}}).exec();
    }

    login(empleado: any): ILoginRespuesta
    {
        const datosSesion: IDatosSesion =
            {
                _id: empleado._id,
                avatar: empleado.avatar,
                nombreCompleto: empleado.nombreCompleto,
                activo: empleado.activo,
                auth: empleado.auth
            };
        return {
            token: this.jwtService.sign(datosSesion),
            datosSesion
        };
    }
}
