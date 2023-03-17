import {IMir} from './mir.interface';
import {Field, ID, Int, Float, ObjectType, InputType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsOptional, IsNotEmpty, IsNumber} from 'class-validator';

// registerEnumType(AscDesc, {name: 'AscDesc'});

// @ObjectType('AvanceType')
// @InputType('AvanceInput')
// export class AvanceDto implements IAvance
// {
//     @Field(() => String, {nullable: true, defaultValue: null})
//     @IsOptional()
//     periodo: string;
//
//     @Field(() => Float, {nullable: true, defaultValue: 0.00})
//     @IsOptional()
//     valor: number;
// }

// @ObjectType('ParamSemType')
// @InputType('ParamSemInput')
// export class ParamSemDto implements IParamSem
// {
//     @Field(() => Float, {nullable: true, defaultValue: 0.00})
//     @IsOptional()
//     @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
//     amarillo: number;
//
//     @Field(() => Float, {nullable: true, defaultValue: 0.00})
//     @IsOptional()
//     @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
//     rojo: number;
//
//     @Field(() => Float, {nullable: true, defaultValue: 0.00})
//     @IsOptional()
//     @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
//     verde: number;
// }

@ObjectType('MirType')
@InputType('MirInput')
@Schema({collection: 'Mir'})
export class MirDto implements IMir
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id: string;

    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @Prop()
    @IsNotEmpty({message: 'El año es requerido'})
    ano: number;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'El tipo es requerido'})
    tipo: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'La dimension es requerida'})
    dimension: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'El centro gestor es requerido'})
    centroGestor: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'La frecuencia de medicion es requerida'})
    frecuenciaMedicion: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop({unique: true})
    @IsNotEmpty({message: 'El id del indicador es requerido'})
    idIndicador: string;

    @Field(() => Int, {nullable: true, defaultValue: 0})
    @Prop()
    @IsNotEmpty({message: 'La linea base del año es requerida'})
    lineaBaseAno: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @Prop()
    @IsNotEmpty({message: 'El valor de la linea base es requerido'})
    lineaBaseValor: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @Prop()
    @IsNotEmpty({message: 'La meta es requerida'})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    meta: number;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'El metodo de calculo es necesario'})
    metodoCalculo: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'El metodo de verificacion es necesario'})
    mediosDeVerificacion: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'El nivel es requerido'})
    nivel: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'El nombre del indicador es necesario'})
    nombreDelIndicador: string;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @Prop()
    @IsNumber({allowNaN: false, maxDecimalPlaces: 2, allowInfinity: false})
    @IsOptional()
    semefVerde: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @Prop()
    @IsNumber({allowNaN: false, maxDecimalPlaces: 2, allowInfinity: false})
    @IsOptional()
    semefAmarillo: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @Prop()
    @IsNumber({allowNaN: false, maxDecimalPlaces: 2, allowInfinity: false})
    @IsOptional()
    semefRojo: number;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el parametro de financiacion'})
    programaFinanciacion: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el resumen narrativo'})
    resumenNarrativo: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Tienes que colocar el sentido del indicador Ascendente o Descendente'})
    sentidoDelIndicador: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Los supuestos son necesarios'})
    supuestos: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesario colocar una unidad de medida'})
    unidadDeMedida: string;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @Prop()
    @IsNumber({allowNaN: false, allowInfinity: false})
    @IsOptional()
    avanceTrim1: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @Prop()
    @IsNumber({allowNaN: false, allowInfinity: false})
    @IsOptional()
    avanceTrim2: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @Prop()
    @IsNumber({allowNaN: false, allowInfinity: false})
    @IsOptional()
    avanceTrim3: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @Prop()
    @IsNumber({allowNaN: false, allowInfinity: false})
    @IsOptional()
    avanceTrim4: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @Prop()
    @IsNumber({allowNaN: false, allowInfinity: false})
    @IsOptional()
    avanceAnual: number;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    formulaTrim1: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    formulaTrim2: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    formulaTrim3: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    formulaTrim4: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    formulaAnual: string;
}

export type MirType = MirDto;
export const SCHEMA_MIR = SchemaFactory.createForClass(MirDto);
