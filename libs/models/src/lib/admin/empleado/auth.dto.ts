import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {IAuth, IRol} from './auth.interface';

@ObjectType('AuthType')
@InputType('AuthInput')
export class AuthDto implements IAuth
{
    @Field({nullable: true})
    _id: string;

    @Field({nullable: true})
    @IsNotEmpty({message: 'La contrasena es requerida'})
        // @Prop()
    contrasena: string;

    @Field({nullable: true})
    @IsOptional()
        // @Prop()
    correo?: string;

    @Field({nullable: true})
    @IsNotEmpty({message: 'El usuario es necesario'})
        // @Prop()
    usuario: string;

    @Field(() => [RolDto], {defaultValue: null})
    @IsNotEmpty({message: 'Es necesario asignar un role'})
        // @Prop()
    rol: RolDto[];
}

@ObjectType('RolType')
@InputType('RolInput')
export class RolDto implements IRol
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'El id del departamento es necesario'})
        // @Prop()
    departamentoId: string;

    @Field({nullable: true})
    @IsNotEmpty({message: 'Es necesario asignar un rol'})
        // @Prop()
    tipoAcceso: 'ninguno' | 'lectura' | 'completo';
}
