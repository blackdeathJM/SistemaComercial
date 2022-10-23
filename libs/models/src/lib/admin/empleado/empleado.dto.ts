import {Field, Float, ID, InputType, Int, ObjectType, OmitType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {IEmpleado, IModificado, IPuesto, ISeguroSocial, TRegEmpleado} from './empleado.interface';
import {AuthDto} from './auth/auth.dto';

@ObjectType('ModificadoType')
@InputType('ModificadoInput')
export class ModificadoDto implements IModificado
{
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Se requiere una accion'})
    accion: string;
    @Field(() => Int, {nullable: true})
    @IsNotEmpty({message: 'Es necesaria la fecha'})
    fecha: number;
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el usuario'})
    usuario: string;
}

export class PuestoDto implements IPuesto
{
    @Field(() => Int, {nullable: true})
    @IsNotEmpty({message: 'Es necesaria una fecha'})
    fecha: number;
    @Field(() => Float, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el ISR'})
    isr: number;
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el puesto'})
    puesto: string;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNotEmpty({message: 'El sueldo es necesario'})
    sueldo: number;
}

export class SeguroSocialDto implements ISeguroSocial
{
    nss: string;
}

@ObjectType('EmpleadoType')
@InputType('EmpleadoInput')
@Schema({collection: 'Empleados'})
export class EmpleadoDto implements IEmpleado
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id: string;
    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    avatar: string;
    @Field(() => Boolean, {nullable: true, defaultValue: true})
    @Prop()
    @IsNotEmpty({message: 'Se necesita especificar si esta activo'})
    activo: boolean = true;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'La calle es necesaria'})
    calle: string;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'La colonia es necesaria'})
    colonia: string;
    @Field(() => String, {nullable: true, defaultValue: ''})
    @Prop()
    @IsOptional()
    correo: string;
    @Field(() => Int, {nullable: true, defaultValue: 0})
    @Prop()
    @IsOptional()
    fechaBaja: number = 0;
    @Field(() => Int, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario colocar la fecha de ingreso'})
    fechaIngreso: number;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El nombre completo es requerido'})
    nombreCompleto: string;
    @Field(() => [ModificadoDto], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    modificadoPor: IModificado[];
    @Field(() => [String], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    telefono: string[];
    @Field(() => AuthDto, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    auth: AuthDto;
    @Field(() => ID, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es nesario el id del departamento al que sera asignado el empleado'})
    deptoId: string;
}

@InputType('RegEmpleadoInput')
export class RegEmpleadoDto extends OmitType(EmpleadoDto, ['_id', 'avatar', 'fechaBaja', 'activo', 'auth'], InputType) implements TRegEmpleado
{
}

export type EmpleadoType = EmpleadoDto & Document;
export const SCHEMA_EMPLEADO = SchemaFactory.createForClass(EmpleadoDto).index({'auth.usuario': 1}, {unique: true, partialFilterExpression: {'auth.usuario': {$exists: true}}});
