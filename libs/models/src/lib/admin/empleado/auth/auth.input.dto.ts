import {Field, ID, InputType} from '@nestjs/graphql';
import {IsNotEmpty} from 'class-validator';
import {ICambioContrasena} from './auth.interface';

@InputType('CambioContrasenaInput')
export class CambioContrsenaDto implements ICambioContrasena
{
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'El id del empleado es necesario'})
    _id: string;
    @Field({nullable: true})
    @IsNotEmpty({message: 'Es necesaria una contrasena'})
    contrasena: string;
}
