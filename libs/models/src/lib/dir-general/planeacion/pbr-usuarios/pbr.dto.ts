import {ObjectType, InputType, Field, Float, Int} from '@nestjs/graphql';
import {IPbrCuestionario} from './pbr.interface';
import {IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

@ObjectType('PbrType')
@InputType('PbrInput')
export class PbrCuestionarioDto implements IPbrCuestionario
{
    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @IsOptional()
    ano: number;

    @Field(() => String, {nullable: true})
    @IsOptional()
    fechaCompleta: string;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    enero: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    febrero: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    marzo: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    abril: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    mayo: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    junio: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    julio: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    agosto: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    septiembre: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    octubre: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    noviembre: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    diciembre: number;

    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El campo id del empleado es requerido'})
    idEmpleado: string;

    @Field(() => String, {nullable: true})
    @IsOptional()
    nombreRes: string;

    @Field(() => String, {nullable: true})
    @IsOptional()
    email: string;

    @Field(() => String, {nullable: true})
    @IsOptional()
    descripcion: string;

    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El campo centro gestor es requerido'})
    centroGestor: string;

    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'La clave es requerido'})
    claveVariable: string;

    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El campo variable origen es requerido'})
    variableOrigen: string;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    trim1: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    trim2: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    trim3: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    trim4: number;

    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El dato es requerido'})
    dato: string;

    @Field({nullable: true})
    @IsNotEmpty({message: 'El id es requerido'})
    id: string;

    @Field({nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    total: number;

    @Field({nullable: true})
    @IsNotEmpty({message: 'La unidad es requerida'})
    unidad: string;
}
