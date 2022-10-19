import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {IsBoolean, IsNotEmpty, IsOptional} from 'class-validator';
import {IAuth, IHijosRol, IRoles} from './auth.interface';
import {Prop} from "@nestjs/mongoose";

@ObjectType('AuthType')
@InputType('AuthInput')
export class AuthDto implements IAuth
{
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'La contrasena es requerida'})
    @Prop()
    contrasena: string;
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El usuario es necesario'})
    @Prop()
    usuario: string;
    @Field(() => [RolDto], {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    role: IRoles[];
    @Field(() => Boolean, {nullable: true, defaultValue: true})
    @IsNotEmpty({message: 'El activo es necesario'})
    @IsBoolean({message: 'Activo debe ser booleano'})
    @Prop()
    activo: boolean;
    @Field(() => String, {nullable: true, defaultValue: 'En-linea'})
    @IsNotEmpty({message: 'El valor del estatus es necesario'})
    @Prop()
    estatus: 'En-linea' | 'Desconectado' | 'Ocupado' | 'No-visible';
}

@ObjectType('RolType')
@InputType('RolInput')
export class RolDto implements IRoles
{
    @Field(() => String, {nullable: true})
    @Prop()
    id: string;
    @Field(() => Boolean, {nullable: true})
    @Prop()
    oculto: boolean;
    @Field(() => String, {nullable: true})
    @Prop()
    tipoAcceso: string;
    @Field(() => String, {nullable: true})
    @Prop()
    titulo: string;
    @Field(() => [HijosRolDto], {nullable: true})
    @Prop()
    hijos: IHijosRol[]
}

@ObjectType('HijosType')
@InputType('HijosInput')
export class HijosRolDto extends RolDto
{
}
