import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {IsNotEmpty} from 'class-validator';
import {EmpleadoDto} from './empleado.dto';
import {IEmpleado} from './empleado.interface';

@ObjectType('LoginRespuestaType')
export class LoginRespuesta
{
    @Field()
    token: string;

    @Field(() => EmpleadoDto, {nullable: true})
    empleado: EmpleadoDto;
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

export class ILoginRespuesta
{
    token: string;
    empleado: IEmpleado;
}
