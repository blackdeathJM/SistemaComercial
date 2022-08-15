import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {IEmpleado} from './empleado.interface';
import {AuthDto} from './auth.dto';

@ObjectType('EmpleadoType')
@InputType('EmpleadoInput')
@Schema({collection: 'Empleados'})
export class EmpleadoDto implements IEmpleado
{
    @Field({nullable: true})
    @IsOptional()
    _id?: string;

    @Field({nullable: true, defaultValue: null})
    @Prop()
    avatar: string;

    @Field({defaultValue: false})
    @Prop()
    @IsNotEmpty({message: 'Se necesita especificar si esta activo'})
    activo: boolean = false;

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
    fechaBaja: Date;

    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario colocar la fecha de ingreso'})
    fechaIngreso: Date;

    @Field(() => [String], {nullable: true, defaultValue: []})
    @Prop()
    modificadoPor: string[] = [];

    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El nombre completo es requerido'})
    nombreCompleto: string;

    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Debers asignar un puesto para el empleado'})
    puesto: string;

    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es requerido al menos un numero de telefono'})
    telefono: string;

    @Field(() => AuthDto, {nullable: true, defaultValue: null})
    @Prop({type: Object})
    auth?: AuthDto;

    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es nesario el id del departamento al que sera asignado el empleado'})
    deptoId: string;
}

export type EmpleadoType = EmpleadoDto & Document;
export const EMPLEADO_SCHEMA = SchemaFactory.createForClass(EmpleadoDto);
