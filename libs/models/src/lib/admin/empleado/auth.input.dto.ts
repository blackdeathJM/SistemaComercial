import {Field, InputType} from '@nestjs/graphql';
import {IsNotEmpty} from 'class-validator';

@InputType('CambioContrasenaInput')
export class CambioContrsenaDto
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'El id del empleado es necesario'})
    _id: string;
    @Field({nullable: true})
    @IsNotEmpty({message: 'Es necesaria una contrasena'})
    contrasena: string;
}
