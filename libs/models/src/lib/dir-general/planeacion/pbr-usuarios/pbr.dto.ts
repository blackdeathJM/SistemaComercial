import {IPbr, IEjercicio} from './pbr.interface';
import {ObjectType, InputType, Field, ID, Float, Int} from '@nestjs/graphql';
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {IsNotEmpty, IsOptional, IsNumber} from 'class-validator';


@ObjectType('EjercicioType')
@InputType('EjercicioInput')
export class EjercicioDto implements IEjercicio
{
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    abril: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    agosto: number;

    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @IsOptional()
    @IsNumber()
    ano: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    diciembre: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    ejercicio: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    enero: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    febrero: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    julio: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    junio: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    marzo: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    mayo: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    noviembre: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    octubre: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    @IsNumber()
    septiembre: number;
    total: number;
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;

}

@ObjectType('PbrType')
@InputType('PbrInput')
@Schema({collection: 'Pbr'})
export class PbrDto implements IPbr
{
    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @Prop()
    ano: number;
    @Field(() => ID, {nullable: true})
    _id: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesaria la clave de la variable'})
    claveVariable: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el dato'})
    dato: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesaria la descripcion'})
    descripcion: string;

    @Field(() => EjercicioDto, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    ejercicio: EjercicioDto;

    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsNotEmpty({message: 'Es necesaria la unidad de medida'})
    unidad: string;
}

export type PbrType = PbrDto & Document;
export const SCHEMA_PBR = SchemaFactory.createForClass(PbrDto);
