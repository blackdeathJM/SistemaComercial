import {ObjectType, InputType, Field, Float, Int, PartialType, ID, ArgsType, PickType} from '@nestjs/graphql';
import {IPbrCuestionario} from './pbr.interface';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

@ObjectType('PbrType')
@InputType('PbrInput')
export class PbrCuestionarioDto implements IPbrCuestionario
{
    @Field(() => Int, {nullable: true, defaultValue: 0})
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

    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'El campo id del empleado es requerido'})
    idEmpleado: string;

    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el nombre del responsable'})
    responsable: string;

    @Field(() => String, {nullable: true})
    @IsOptional()
    correo: string;

    @Field(() => String, {nullable: true})
    @IsOptional()
    descripcion: string;

    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El campo centro gestor es requerido'})
    centroGestor: string;

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

    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El id es requerido'})
    idIndicador: string;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: true, allowInfinity: false, maxDecimalPlaces: 2})
    total: number;

    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'La unidad es requerida'})
    unidad: string;

    @IsBoolean({message: 'El valor debe ser boleano'})
    @Field(() => Boolean, {nullable: true})
    esSumatoriaTotal: boolean;

    @IsBoolean({message: 'El valor debe ser boleano'})
    @Field(() => Boolean, {nullable: true})
    esSumatoriaTrim: boolean;
}

@InputType('RegPbrInput')
export class RegPbrDto extends PartialType(PbrCuestionarioDto, InputType)
{
    @IsNotEmpty({message: 'Es necesario el id'})
    @Field(() => ID, {nullable: true})
    _id: string;

    @IsOptional()
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    esActualizar: boolean;
}

export type TRegPbr = RegPbrDto;

@InputType('RegAvancesPbrInput')
export class RegAvancesPbrDto extends PickType(PbrCuestionarioDto,
    ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', 'idIndicador', 'esSumatoriaTrim', 'esSumatoriaTotal'], InputType)
{
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'El id es necesario'})
    _id: string
}

export type TRegAvancesPbr = RegAvancesPbrDto;
