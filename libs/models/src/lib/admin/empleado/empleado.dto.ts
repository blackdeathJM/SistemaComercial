import {Field, Float, ID, InputType, Int, ObjectType, OmitType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
import {IEmpleado, IModificado, IPuesto, ISeguroSocial, ITelefono, TRegEmpleado} from './empleado.interface';
import {AuthDto} from './auth/auth.dto';
import {GraphQLJSON} from 'graphql-scalars';

@ObjectType('ModificadoPorType')
@InputType('ModificadoPorInput')
export class ModificadoPorDto implements IModificado
{
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Es requerida una accion'})
    accion: string;
    @Field(() => Int, {nullable: true, defaultValue: 0})
    @IsNotEmpty({message: 'Es necesaria una fecha'})
    @IsNumber({}, {message: 'La fecha debe estar en formato unix'})
    fecha: number;
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Es necesario colocar el usuario que estar realizando el cambio'})
    usuario: string;
    @Field(() => [GraphQLJSON], {nullable: true, defaultValue: null})
    @IsOptional()
    valorActual: object[];
    @Field(() => [GraphQLJSON], {nullable: true, defaultValue: null})
    @IsOptional()
    valorAnterior: object[];
}

@ObjectType('TelefonoType')
@InputType('TelefonoInput')
export class TelefonoDto implements ITelefono
{
    @Field(() => String, {nullable: true})
    numero: string;
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
    @IsBoolean({message: 'Activo debe ser un boleano'})
    activo: boolean;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'La calle es necesaria'})
    calle: string;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'La colonia es necesaria'})
    colonia: string;
    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    correo: string;
    @Field(() => Int, {nullable: true, defaultValue: null})
    @Prop()
    fechaBaja: number;
    @Field(() => Int, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario colocar la fecha de ingreso'})
    fechaIngreso: number;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El nombre completo es requerido'})
    nombreCompleto: string;
    @Field(() => [TelefonoDto], {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    telefono: TelefonoDto[];
    @Field(() => AuthDto, {nullable: true, defaultValue: null})
    @Prop()
    auth: AuthDto;
    @Field(() => [ModificadoPorDto], {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Este campo es requerido'})
    modificadoPor: ModificadoPorDto[];
    @Field(() => ID, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es nesario el id del departamento al que sera asignado el empleado'})
    deptoId: string;
}

@InputType('RegEmpleadoInput')
export class RegEmpleadoDto extends OmitType(EmpleadoDto, ['_id', 'auth', 'fechaBaja'], InputType) implements TRegEmpleado
{
}

export type EmpleadoType = EmpleadoDto & Document;
export const SCHEMA_EMPLEADO = SchemaFactory.createForClass(EmpleadoDto).index({'auth.usuario': 1}, {unique: true, partialFilterExpression: {'auth.usuario': {$exists: true}}});
