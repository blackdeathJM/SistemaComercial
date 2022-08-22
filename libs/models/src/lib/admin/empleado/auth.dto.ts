import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {IsNotEmpty} from 'class-validator';
import {IAuth, IRol} from './auth.interface';

@ObjectType('AuthType')
@InputType('AuthInput')
export class AuthDto implements IAuth
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'La contrasena es requerida'})
    contrasena: string;
    @Field({nullable: true})
    @IsNotEmpty({message: 'El usuario es necesario'})
    usuario: string;
    @Field(() => [RolDto], {defaultValue: null})
    @IsNotEmpty({message: 'Es necesario asignar un role'})
    rol: RolDto[];
    @Field(() => Boolean, {nullable: true, defaultValue: true})
    @IsNotEmpty({message: 'El activo es necesario'})
    activo: boolean;
}

@ObjectType('RolType')
@InputType('RolInput')
export class RolDto implements IRol
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'El id del departamento es necesario'})
    id: string;
    @Field({nullable: true})
    @IsNotEmpty({message: 'Es necesario asignar un rol'})
    tipoAcceso: 'ninguno' | 'lectura' | 'completo';
    @Field(() => Boolean, {nullable: true, defaultValue: true})
    oculto: boolean;
}
