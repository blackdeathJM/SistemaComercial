import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {IsNotEmpty} from 'class-validator';
import {IDatosSesion} from './auth.interface';
import {AuthDto} from './auth.dto';
@ObjectType('DatosSesionType')
export class DatosSesionDto implements IDatosSesion
{
    @Field(() => ID)
    _id: string;
    @Field(() => Boolean)
    activo: boolean;
    @Field(() => AuthDto)
    auth: AuthDto;
    @Field({nullable: true})
    avatar: string;
    @Field()
    nombreCompleto: string;
    @Field(() => ID, {nullable: true})
    deptoId: string;
}
export interface ILoginRespuesta
{
    token: string;
    datosSesion: IDatosSesion;
}
@ObjectType('LoginRespuestaType')
export class LoginRespuestaDto implements ILoginRespuesta
{
    @Field()
    token: string;
    @Field(() => DatosSesionDto)
    datosSesion: DatosSesionDto;
}

@InputType('LoginInput')
export class LoginDto implements ILogin
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'El usuario no puede estar vacio'})
    usuario: string;

    @Field({nullable: true})
    @IsNotEmpty({message: 'La contrasena no puede estar vacia'})
    contrasena: string;
}

export interface ILogin
{
    usuario: string;
    contrasena: string;
}
