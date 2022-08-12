import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema} from '@nestjs/mongoose';
import {IAuth, IEmpleado} from '@sistema-comercial/models';
import {IsNotEmpty, IsOptional} from 'class-validator';

@ObjectType('EmpleadoType')
@InputType('EmpleadoInput')
@Schema({collection: 'empleados'})
export class EmpleadoDto implements IEmpleado
{
    @Field({nullable: true})
    @Prop()
    @IsOptional()
    _id?: string;

    @Field({defaultValue: false})
    @Prop()
    @IsNotEmpty({message: 'Se necesita especificar si esta activo'})
    activo: boolean;

    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'La calle es necesaria'})
    calle: string;

    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'La colonia es necesaria'})
    colonia: string;

    @Field({nullable: true})
    @Prop()
    @IsOptional()
    fechaBaja: string;

    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario colocar la fecha de ingreso'})
    fechaIngreso: string;
    modificadoPor: string[];
    nombreCompleto: string;
    auth: IAuth;

    deptoId: string;

}
