import {IPbr, IEjercicio} from './pbr.interface';
import {ObjectType, InputType, Field, ID, Float, Int} from '@nestjs/graphql';
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {IsNotEmpty, IsOptional, IsNumber} from 'class-validator';


@ObjectType('EjercicioType')
@InputType('EjercicioInput')
export class EjercicioDto implements IEjercicio
{
    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    ano: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    abril: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    agosto: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    diciembre: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    enero: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    febrero: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    julio: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    junio: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    marzo: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    mayo: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    noviembre: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    octubre: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El valor debe ser numerico'})
    septiembre: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false})
    total: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false})
    trim1: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false})
    trim2: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false})
    trim3: number = 0;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false})
    trim4: number = 0;

}

export type TEjercicio = EjercicioDto;

@ObjectType('PbrType')
@InputType('PbrInput')
@Schema({collection: 'Pbr'})
export class PbrDto implements IPbr
{
    @Field(() => ID, {nullable: true})
    _id: string;

    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @Prop()
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0}, {message: 'El año es requerido'})
    ano: number;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesaria la clave de la variable'})
    claveVariable: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesaria la variable de origen'})
    variableOrigen: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el dato'})
    dato: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesaria la descripcion'})
    descripcion: string;

    @Field(() => EjercicioDto, {nullable: true})
    @Prop({select: false})
    @IsOptional()
    ejercicio: EjercicioDto;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesaria la unidad de medida'})
    unidad: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'El id del empleado es requerido'})
    idEmpleado: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el centro gestor'})
    centroGestor: string;
}

export type PbrType = PbrDto & Document;
export const SCHEMA_PBR = SchemaFactory.createForClass(PbrDto);
