import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {IsBoolean, IsNotEmpty, IsOptional} from 'class-validator';
import {IAsigRoles, IAuth} from './auth.interface';
import {GraphQLJSONObject} from 'graphql-scalars';

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
    @Field(() => [GraphQLJSONObject], {nullable: true, defaultValue: null})
    @IsOptional()
    role: object[];
    @Field(() => Boolean, {nullable: true, defaultValue: true})
    @IsBoolean({message: 'Activo debe ser booleano'})
    @IsOptional()
    activo: boolean;
    @Field(() => [String], {nullable: true, defaultValue: []})
    @IsOptional()
    permisos: string[];
    @Field(() => [String], {nullable: true, defaultValue: []})
    @IsOptional()
    controles: string[];
    @Field(() => String, {nullable: true, defaultValue: 'En-linea'})
    @IsNotEmpty({message: 'El valor del estatus es necesario'})
    estatus: 'En-linea' | 'Desconectado' | 'Ocupado' | 'No-visible';
}

@InputType('AsigRolesInput')
export class AsigRolesDto implements IAsigRoles
{
    @Field(() => [GraphQLJSONObject], {nullable: true})
    @IsNotEmpty({message: 'Requerido'})
    rol: object[];
}
