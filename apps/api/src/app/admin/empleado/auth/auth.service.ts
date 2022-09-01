import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ObjectId} from 'bson';
import {ROLES_POR_DEFECTO} from './rol.model';
import {EmpleadoDto, EmpleadoType} from '@sistema-comercial/modelos/empleado.dto';
import {IEmpleado} from '@sistema-comercial/modelos/empleado.interface';
import {AuthDto, RolDto} from '@sistema-comercial/modelos/auth.dto';
import {CambioContrsenaDto} from '@sistema-comercial/modelos/auth.input.dto';
import {ILoginRespuesta} from '@sistema-comercial/modelos/login.dto';
import {IDatosSesion} from '@sistema-comercial/modelos/auth.interface';

@Injectable()
export class AuthService
{
    salt = 10;

    constructor(@InjectModel(EmpleadoDto.name) private empleado: Model<EmpleadoType>, private jwtService: JwtService)
    {
    }

    async asignarAuth(_id: string, auth: AuthDto): Promise<IEmpleado | NotFoundException>
    {
        // Realizamos una busqueda para asegurarnos que no exista
        await this.buscarEmpleadoPorUsuario(auth.usuario);

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

    async actualizarRol(_id: string, rol: RolDto): Promise<IEmpleado | NotFoundException>
    {
        // buscamos el empleado por el id principal
        // const empleado = await this.empleado.findOneAndUpdate({_id: new ObjectId(_id._id), "auth.rol.id": rol.id}, {});
        const empleado = await this.empleado.findByIdAndUpdate(new ObjectId(_id),
            {$set: {'auth.rol.$[i].tipoAcceso': rol.tipoAcceso, 'auth.rol.$[i].oculto': rol.oculto}}, {
                arrayFilters: [{'i.id': {$eq: rol.id}}], returnOriginal: false
            });

        if (!empleado)
        {
            throw new NotFoundException({message: 'El usuario no fue encontrado'});
        }

        return empleado;

    }

    async validarUsuario(username: string, password: string): Promise<IEmpleado>
    {
        const empleado = await this.empleado.findOne({'auth.usuario': username}).exec();
        if (!empleado)
        {
            throw new NotFoundException('El usuario no fuen encontrado para autenticarse');
        }

        const validar = await bcrypt.compare(password, empleado.auth.contrasena);

        if (validar)
        {
            delete empleado.auth.contrasena;
            return empleado;
        }
        return null;
    }

    login(empleado: any): ILoginRespuesta
    {
        const datosSesion: IDatosSesion =
            {
                _id: empleado.user._id,
                avatar: empleado.user.avatar,
                nombreCompleto: empleado.user.nombreCompleto,
                activo: empleado.user.activo,
                auth: empleado.user.auth
            };
        return {
            token: this.jwtService.sign(datosSesion),
        };
    }

    async buscarEmpleadoPorUsuario(usuario: string): Promise<void>
    {
        const buscarEmpleado = await this.empleado.findOne({'auth.usuario': usuario}).exec();

        if (buscarEmpleado)
        {
            throw new ConflictException({message: 'Mensaje de error'}, 'Conflicto con el usuario, ya existe');
        }
    }
}
