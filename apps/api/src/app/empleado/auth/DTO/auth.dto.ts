import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {IAuth, IRol} from '@sistema-comercial/models';
import {IsNotEmpty, IsOptional} from 'class-validator';

@ObjectType('AuthType')
@InputType('AuthInput')
export class AuthDto implements IAuth
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'La contrasena es requerida'})
    contrasena: string;
    @Field({nullable: true})
    @IsOptional()
    correo?: string;
    @Field({defaultValue: null})
    @IsNotEmpty({message: 'Es necesario asignar un role'})
    rol: IRol[];
    @Field({nullable: true})
    @IsNotEmpty({message: 'El usuario es necesario'})
    usuario: string;
}

