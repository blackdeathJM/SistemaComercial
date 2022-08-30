import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {IsNotEmpty} from 'class-validator';

@ObjectType('LoginRespuestaType')
export class LoginRespuesta implements ILoginRespuesta
{
    @Field()
    token: string;
}

@InputType('LoginInput')
export class LoginDto
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'El usuario no puede estar vacio'})
    usuario: string;

    @Field({nullable: true})
    @IsNotEmpty({message: 'La contrasena no puede estar vacia'})
    contrasena: string;
}

export interface ILoginRespuesta
{
    token: string;

}
