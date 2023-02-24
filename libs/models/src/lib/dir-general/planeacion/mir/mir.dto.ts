import {IMir, IAvance, ICaracterisitca, IParamSem, ILineaBase, AscDesc} from './mir.interface';
import {Field, ID, Int, Float, registerEnumType, ObjectType, InputType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsOptional, IsNotEmpty, IsNumber} from 'class-validator';

registerEnumType(AscDesc, {name: 'AscDesc'});

@ObjectType('AvanceType')
@InputType('AvanceInput')
export class AvanceDto implements IAvance
{
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsOptional()
    periodo: string;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    valor: number;
}

@ObjectType('CaracteristicasType')
@InputType('CaracteristicasInput')
export class CaracterisitcaDto implements ICaracterisitca
{
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'La dimension es necesaria'})
    dimension: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'El tipo es necesario'})
    tipo: string;

}

@ObjectType('ParamSemType')
@InputType('ParamSemInput')
export class ParamSemDto implements IParamSem
{
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    amarillo: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    rojo: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    verde: number;
}

@ObjectType('LineaBaseType')
@InputType('LineaBaseInput')
export class LineaBaseDto implements ILineaBase
{
    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    @IsNotEmpty({message: 'El ano de linea base no puede estar vacio'})
    ano: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    @IsNotEmpty({message: 'El valor de linea base no puede estar vacio'})
    valor: number;
}

@ObjectType('MirType')
@InputType('MirInput')
@Schema({collection: 'Mir'})
export class MirDto implements IMir
{
    @Field(() => ID)
    @IsOptional()
    _id: string;

    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @Prop()
    @IsNotEmpty({message: 'El año es requerido'})
    ano: number;

    @Field(() => [AvanceDto], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    avance: AvanceDto[];

    @Field(() => CaracterisitcaDto, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Las caracteristicas son requeridas'})
    caracteriticas: CaracterisitcaDto;

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

    @Field(() => LineaBaseDto, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'La linea base es requerida'})
    lineaBase: LineaBaseDto;

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
    metodoDeVerificacion: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'El nivel es requerido'})
    nivel: string;

    @Field(() => String, {nullable: true, defaultValue: true})
    @Prop()
    @IsNotEmpty({message: 'El nombre del indicador es necesario'})
    nombreDelIndicador: string;

    @Field(() => ParamSemDto, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesario colocar un parametro de semaforizacion'})
    parametroDeSemaforizacion: ParamSemDto;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el parametro de financiacion'})
    programaFinanciacion: string;

    @Field(() => String, {nullable: true, defaultValue: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el resumen narrativo'})
    resumenNarrativo: string;

    @Field(() => AscDesc, {nullable: true, defaultValue: AscDesc.ascendente})
    @Prop({type: String})
    @IsNotEmpty({message: 'Tienes que colocar el sentido del indicador Ascendente o Descendente'})
    sentidoDelIndicador: AscDesc;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Los supuestos son necesarios'})
    supuestos: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesario colocar una unidad de medida'})
    unidadDeMedida: string;
}


export type MirType = MirDto & Document;
export const SCHEMA_MIR = SchemaFactory.createForClass(MirDto);
