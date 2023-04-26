import { IMirCuestionario } from './mir.interface';
import { Field, ID, Int, Float, ObjectType, InputType, PickType, PartialType, ArgsType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

// registerEnumType(AscDesc, {name: 'AscDesc'});

@ObjectType('MirCuestionarioType')
@InputType('MirCuestionarioInput')
export class MirCuestionarioDto implements IMirCuestionario
{
    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'El tipo es requerido' })
    tipo: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'La dimension es requerida' })
    dimension: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'El centro gestor es requerido' })
    centroGestor: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'La frecuencia de medicion es requerida' })
    frecuenciaMedicion: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @Prop({ unique: true })
    @IsNotEmpty({ message: 'El id del indicador es requerido' })
    idIndicador: string;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    @IsNotEmpty({ message: 'La linea base del año es requerida' })
    lineaBaseAno: number;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'El valor de la linea base es requerido' })
    lineaBaseValor: string;

    @Field(() => Float, { nullable: true, defaultValue: 0.00 })
    @IsNotEmpty({ message: 'La meta es requerida' })
    meta: number;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'El metodo de calculo es necesario' })
    metodoCalculo: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'El nivel es requerido' })
    nivel: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'El nombre del indicador es necesario' })
    nombreDelIndicador: string;

    @Field(() => Float, { nullable: true, defaultValue: 0 })
    @IsNumber({ allowNaN: false, maxDecimalPlaces: 2, allowInfinity: false })
    @IsOptional()
    semefVerde: number;

    @Field(() => Float, { nullable: true, defaultValue: 0.00 })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'El valor debe ser numerico, semaforo verde' })
    semefVerdeV: number;

    @Field(() => Float, { nullable: true, defaultValue: 0 })
    @IsNumber({ allowNaN: false, maxDecimalPlaces: 2, allowInfinity: false })
    @IsOptional()
    semefAmarillo: number;

    @Field(() => Float, { nullable: true, defaultValue: 0.00 })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'El valor debe ser numerico, semaforo amarillo' })
    semefAmarilloV: number;

    @Field(() => Float, { nullable: true, defaultValue: 0 })
    @IsNumber({ allowNaN: false, maxDecimalPlaces: 2, allowInfinity: false })
    @IsOptional()
    semefRojo: number;

    @Field(() => Float, { nullable: true, defaultValue: 0.00 })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'El valor debe ser numerico, semaforo rojo' })
    semefRojoV: number;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'Es necesario el parametro de financiacion' })
    programaFinanciacion: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'Es necesario el resumen narrativo' })
    resumenNarrativo: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'Tienes que colocar el sentido del indicador Ascendente o Descendente' })
    sentidoDelIndicador: string;


    @Field(() => String, { nullable: true, defaultValue: null })
    @IsNotEmpty({ message: 'Es necesario colocar una unidad de medida' })
    unidadDeMedida: string;

    @Field(() => Float, { nullable: true, defaultValue: 0.00 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    avanceTrim1: number;

    @Field(() => Float, { nullable: true, defaultValue: 0.00 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    avanceTrim2: number;

    @Field(() => Float, { nullable: true, defaultValue: 0.00 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    avanceTrim3: number;

    @Field(() => Float, { nullable: true, defaultValue: 0.00 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    avanceTrim4: number;

    @Field(() => Float, { nullable: true, defaultValue: 0.00 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    avanceAnual: number;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsOptional()
    formulaTrim1: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsOptional()
    formulaTrim2: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsOptional()
    formulaTrim3: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsOptional()
    formulaTrim4: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsOptional()
    formulaAnual: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @IsOptional()
    correo: string;

    @Field(() => String, { nullable: true })
    @IsNotEmpty({ message: 'Es necesario el nombre del encargado' })
    responsable: string;

    @Field(() => String, { nullable: true })
    @IsNotEmpty({ message: 'Es necesario el id del encargado' })
    idEmpleado: string;
}

@InputType('RegMirInput')
export class RegMirDto extends PartialType(MirCuestionarioDto, InputType)
{
    @Field(() => ID, { nullable: true })
    @IsNotEmpty({ message: 'Es necesario el id' })
    _id?: string;

    @Field(() => Boolean, { nullable: true, defaultValue: false })
    @IsOptional()
    esActualizar: boolean;
}

export type TRegMir = RegMirDto;

@ArgsType()
export class FilCentroGestorMirDto extends PickType(MirCuestionarioDto, ['centroGestor'], ArgsType)
{
    @Field(() => ID, { nullable: true })
    @IsNotEmpty({ message: 'El id es necesario' })
    _id: string;
}

export type TFilCentroGestorMir = FilCentroGestorMirDto;

@ArgsType()
export class EliminarElementoMirDto extends PickType(MirCuestionarioDto, ['idIndicador'], ArgsType)
{
    @Field(() => ID, { nullable: true })
    @IsNotEmpty({ message: 'El id es necesario' })
    _id: string;
}

export type TEliminarElementoMir = EliminarElementoMirDto;
