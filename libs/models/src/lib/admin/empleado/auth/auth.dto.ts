import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {IsNotEmpty} from 'class-validator';
import {IAuth, IHijosRol, IRoles} from './auth.interface';

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
    rol: RolDto[];
    @Field(() => Boolean, {nullable: true, defaultValue: true})
    @IsNotEmpty({message: 'El activo es necesario'})
    activo: boolean;
    @Field({nullable: true, defaultValue: 'en-linea'})
    @IsNotEmpty({message: 'El valor del estatus es necesario',})
    estatus: 'En-linea' | 'Desconectado' | 'Ocupado' | 'No-visible';
}

@ObjectType('RolType')
@InputType('RolInput')
export class RolDto implements IRoles
{
    @Field(() => String)
    centroGestor: string;
    @Field(() => String)
    id: string;
    @Field(() => Boolean)
    oculto: boolean;
    @Field(() => String)
    tipoAcceso: string;
    @Field(() => String)
    titulo: string;
    @Field(() => [HijosRolDto])
    hijos: IHijosRol[]
}

export class HijosRolDto extends RolDto
{
}
