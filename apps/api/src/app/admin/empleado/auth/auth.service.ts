import {HttpException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {AuthDto, EmpleadoDto, EmpleadoType, IEmpleado, ILoginRespuesta} from '@sistema-comercial/models';
import {Model} from 'mongoose';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ObjectId} from 'bson';
import {CambioContrsenaDto} from '@sistema-comercial/models';

@Injectable()
export class AuthService
{
    salt = 10;

    constructor(@InjectModel(EmpleadoDto.name) private empleado: Model<EmpleadoType>, private jwtService: JwtService)
    {
    }

    async asignarAuth(_id: string, auth: AuthDto): Promise<IEmpleado | HttpException>
    {
        const buscarEmpleado = await this.empleado.findOne({'auth.usuario': auth.usuario}).exec();
        if (buscarEmpleado)
        {
            return new HttpException('Recurso en conflicto', 409);
        }

        const contrasena = auth.contrasena;
        auth.contrasena = await bcrypt.hash(contrasena, this.salt);
        return await this.empleado.findByIdAndUpdate(new ObjectId(_id), {$set: {auth}}, {returnOriginal: false, runValidators: true}).exec();
    }

    async actualizarContrasenaAdmin(datos: CambioContrsenaDto): Promise<IEmpleado | NotFoundException>
    {
        const nvaContrasena = await bcrypt.hash(datos.contrasena, this.salt);
        const empleado = await this.empleado.findOneAndUpdate(new ObjectId(datos._id), {$set: {'auth.contrsena': nvaContrasena}}, {returnOriginal: false}).exec();
        if (!empleado)
        {
            throw new NotFoundException('No se encontro registro para actualizar la contrasena');
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
        return {
            token: this.jwtService.sign({_id: empleado.user._id, auth: empleado.user.auth, avatar: empleado.user.avatar}),
            empleado: empleado.user
        };
    }
}
