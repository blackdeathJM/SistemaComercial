import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {IsBoolean, IsNotEmpty, IsOptional} from 'class-validator';
import {IAuth} from './auth.interface';

@ObjectType('AuthType')
@InputType('AuthInput')
export class AuthDto implements IAuth
{
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'La contrasena es requerida'})
    contrasena: string;
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El usuario es necesario'})
    usuario: string;
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsOptional()
    role: string;
    @Field(() => Boolean, {nullable: true, defaultValue: true})
    @IsNotEmpty({message: 'El activo es necesario'})
    @IsBoolean({message: 'Activo debe ser booleano'})
    activo: boolean;
    @Field(() => String, {nullable: true, defaultValue: 'En-linea'})
    @IsNotEmpty({message: 'El valor del estatus es necesario'})
    estatus: 'En-linea' | 'Desconectado' | 'Ocupado' | 'No-visible';
}
