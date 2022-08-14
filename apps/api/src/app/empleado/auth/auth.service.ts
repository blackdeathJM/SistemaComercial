import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {AuthDto, EmpleadoDto, EmpleadoType, IEmpleado, LoginRespuesta} from '@sistema-comercial/models';
import {Model} from 'mongoose';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ObjectId} from 'bson';

@Injectable()
export class AuthService
{
    constructor(@InjectModel(EmpleadoDto.name) private empleado: Model<EmpleadoType>, private jwtService: JwtService)
    {
    }

    async asignarAuth(auth: AuthDto): Promise<IEmpleado | HttpException>
    {
        const salt = 10;
        const buscarEmpleado = await this.empleado.findOne({'auth.usuario': auth.usuario}).exec();
        if (buscarEmpleado)
        {
            return new HttpException('Recurso en conflicto', 409);
        }

        const contrasena = auth.contrasena;
        auth.contrasena = await bcrypt.hash(contrasena, salt);
        const {_id, ...resto} = auth;

        return await this.empleado.findByIdAndUpdate(new ObjectId(_id),
            {$set: {auth: resto}}, {returnOriginal: false, runValidators: true}).exec();
    }

    async validarUsuario(username: string, password: string): Promise<IEmpleado>
    {
        const empleado = await this.empleado.findOne({'auth.usuario': username}).exec();
        const validar = await bcrypt.compare(password, empleado.auth.contrasena);
        if (empleado && validar)
        {
            delete empleado.auth.contrasena;
            return empleado;
        }
        return null;
    }

    login(empleado: any): LoginRespuesta
    {
        console.log('login', empleado);
        return {
            token: this.jwtService.sign({_id: empleado.user._id, auth: empleado.user.auth, avatar: empleado.user.avatar}),
            empleado: empleado.user
        };
    }
}
