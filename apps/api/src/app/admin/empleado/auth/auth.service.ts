import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ObjectId} from 'bson';
import {EmpleadoDto, EmpleadoType} from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {AuthDto} from '#api/libs/models/src/lib/admin/empleado/auth/auth.dto';
import {IEmpleado} from '#api/libs/models/src/lib/admin/empleado/empleado.interface';
import {CambioContrsenaDto} from '#api/libs/models/src/lib/admin/empleado/auth/auth.input.dto';
import {ILoginRespuesta} from '#api/libs/models/src/lib/admin/empleado/auth/login.dto';
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
        const empleado = await this.empleado.findByIdAndUpdate(_id, {$set: {auth}, $push: {modificadoPor}}, {returnOriginal: false, runValidators: true}).exec();
        if (!empleado)
        {
            throw new NotFoundException('No se pudo asignar una sesion por que el usuario no fue encontrado');
        }
        return empleado;
    }

    async actualizarContrasenaAdmin(datos: CambioContrsenaDto, modificadoPor: ModificadoPorDto): Promise<IEmpleado>
    {
        const nvaContrasena = await bcrypt.hash(datos.contrasena, this.salt);

        const empleado = await this.empleado.findByIdAndUpdate(new ObjectId(datos._id),
            {$set: {'auth.contrasena': nvaContrasena}, $push: {modificadoPor}}, {returnOriginal: false}).exec();
        if (!empleado)
        {
            throw new NotFoundException('No se encontro registro para actualizar la contrasena');
        }

        return empleado;
    }

    async validarUsuario(username: string, password: string): Promise<EmpleadoDto>
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
        console.log('datos del empleado en el login', empleado);
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
