import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {IAuth, IRol} from '@sistema-comercial/models';
import {IsNotEmpty, IsOptional} from 'class-validator';

@ObjectType('AuthType')
@InputType('AuthInput')
export class AuthDto implements IAuth
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'La contrasena es requerida'})
    contrasena!: string;

    @Field({nullable: true})
    @IsOptional()
    correo?: string;

    @Field({nullable: true})
    @IsNotEmpty({message: 'El usuario es necesario'})
    usuario!: string;

    @Field(() => [RolDto], {defaultValue: null})
    @IsNotEmpty({message: 'Es necesario asignar un role'})
    rol!: RolDto[];
}

@ObjectType('RolType')
@InputType('RolInput')
export class RolDto implements IRol
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'El id del departamento es necesario'})
    departamentoId: string;

    @Field({nullable: true})
    @IsNotEmpty({message: 'El ro es necesario'})
    rol: string;

    @Field({nullable: true})
    @IsNotEmpty({message: 'Es necesario asignar un rol'})
    tipoAcceso: 'ninguno' | 'lectura' | 'completo';
}
