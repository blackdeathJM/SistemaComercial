import {Field, Float, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {ICorreo, IEmpleado, IModificado, IPuesto, ISeguroSocial, ITelefono} from './empleado.interface';
import {AuthDto} from './auth.dto';

@ObjectType('ModificadoType')
@InputType('ModificadoInput')
export class ModificadoDto implements IModificado
{
    @Field(() => Date, {nullable: true})
    @IsNotEmpty({message: 'Es necesaria la fecha'})
    fecha: Date;
    @Field({nullable: true})
    @IsNotEmpty({message: 'Es necesario el usuario'})
    usuario: string;
}

@ObjectType('TelefonoType')
@InputType('TelefonoInput')
export class TelefonoDto implements ITelefono
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'La etiqueta es requerida'})
    etiqueta: string;
    @Field({nullable: true})
    @IsNotEmpty({message: 'El telefono es requerido'})
    telefono: string;
}

@ObjectType('CorreoType')
@InputType('CorreoInput')
export class CorreoDto implements ICorreo
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'Es necesario un correo electronico'})
    correo: string;
    @Field({nullable: true})
    @IsNotEmpty({message: 'Es necesario una etiqueta'})
    etiqueta: string;
}

export class PuestoDto implements IPuesto
{
    @Field(() => Date, {nullable: true})
    @IsNotEmpty({message: 'Es necesaria una fecha'})
    fecha: Date;
    @Field(() => Float, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el ISR'})
    isr: number;
    @Field(() => [ModificadoDto], {nullable: true})
    @IsNotEmpty({message: 'Es necesario quien esta modificando el documento'})
    modificado: ModificadoDto[];
    @Field({nullable: true})
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
    // @Field(() => [CorreoDto], {nullable: true})
    // @Prop()
    // correo: CorreoDto[];
    @Field(() => Date, {nullable: true})
    @Prop()
    fechaBaja: Date;
    @Field(() => Date, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario colocar la fecha de ingreso'})
    fechaIngreso: Date;
    @Field(() => [ModificadoDto], {nullable: true, defaultValue: []})
    @Prop()
    @IsNotEmpty({message: 'El campo modificado por es necesario'})
    modificadoPor: ModificadoDto[];
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El nombre completo es requerido'})
    nombreCompleto: string;
    // @Field(() => [PuestoDto], {nullable: true})
    // @Prop()
    // @IsNotEmpty({message: 'Debers asignar un puesto para el empleado'})
    // puesto: PuestoDto[];
    // @Field(() => [TelefonoDto], {nullable: true})
    // @Prop()
    // @IsNotEmpty({message: 'Es requerido al menos un numero de telefono'})
    // telefono: TelefonoDto[];
    // @Field(() => SeguroSocialDto, {nullable: true})
    // @Prop()
    // @IsNotEmpty({message: 'Son necesarios los datos del IMSS'})
    // seguroSocial: SeguroSocialDto;
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
