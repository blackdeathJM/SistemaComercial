import {InputType, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class LoginRespuesta
{
    token: string;
    empleado: string;
}

@InputType()
export class LoginDto
{
    usuario: string;
    contrasena: string;
}
