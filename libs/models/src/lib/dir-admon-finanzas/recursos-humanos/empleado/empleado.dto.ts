import {Field, Float, ID, InputType, Int, ObjectType, OmitType, PartialType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsBoolean, IsNotEmpty, IsOptional} from 'class-validator';
import {IEmpleado, IPuesto, ISeguroSocial, ITelefono} from './empleado.interface';
import {ModificadoPorDto} from '../../../common/common.dto';
import {AuthDto} from '../../../admin/empleado/auth/auth.dto';

@ObjectType('TelefonoType')
@InputType('TelefonoInput')
export class TelefonoDto implements ITelefono
{
    @Field(() => String, {nullable: true})
    numero: string;
}

@InputType('PuestoInput')
@ObjectType('PuestoType')
export class PuestoDto implements IPuesto
{
    @Field(() => Int, {nullable: true})
    @IsNotEmpty({message: 'Es necesaria una fecha'})
    fechaAsignacion: number;
    @Field(() => Float, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el ISR'})
    isr: number;
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el puesto'})
    puesto: string;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNotEmpty({message: 'El sueldo es necesario'})
    sueldo: number;
    @Field(() => Boolean, {nullable: true, defaultValue: true})
    @IsBoolean({message: 'El valor debe ser un booleano'})
    activo: boolean;
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

    @Field(() => [ModificadoPorDto], {nullable: true, defaultValue: []})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el campo modificado por'})
    modificadoPor: ModificadoPorDto[];

    @Field(() => [PuestoDto], {nullable: true, defaultValue: []})
    @Prop()
    @IsNotEmpty({message: 'Es necesario asignar un puesto'})
    puesto: PuestoDto[];

    @Field(() => ID, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es nesario el id del departamento al que sera asignado el empleado'})
    deptoId: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    planeacionCentroGestor: string;
}

@InputType('RegEmpleadoInput')
export class RegEmpleadoDto extends PartialType(EmpleadoDto, InputType) implements TRegEmpleado
{
}

export type EmpleadoType = EmpleadoDto;

export type TRegEmpleado = RegEmpleadoDto;
export const SCHEMA_EMPLEADO = SchemaFactory.createForClass(EmpleadoDto).index({'auth.usuario': 1}, {unique: true, partialFilterExpression: {'auth.usuario': {$exists: true}}});
