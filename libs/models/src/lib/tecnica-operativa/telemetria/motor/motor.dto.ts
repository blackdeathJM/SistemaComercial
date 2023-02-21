import {Field, Float, InputType, ObjectType} from '@nestjs/graphql';
import {IMotor} from './motor.interface';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
import {GraphQLDateTime} from 'graphql-scalars';

@ObjectType('MotorType')
@InputType('MotorInput')
export class MotorDto implements IMotor
{
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @IsBoolean({message: 'El valor activo del motor debe ser un ser boleano'})
    activo: boolean;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    amperaje: number;

    @Field(() => [String], {nullable: true, defaultValue: []})
    @IsOptional()
    evidenciaInst: string[];

    @Field(() => [String], {nullable: true, defaultValue: []})
    @IsOptional()
    evidenciaRetiro: string[];

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2}, {message: 'El factor de potencia debe ser un valor numerico'})
    factPotencia: number;

    @Field(() => GraphQLDateTime, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesario la fecha de instalacion del motor'})
    fechaInstalacion: Date;

    @Field(() => GraphQLDateTime, {nullable: true, defaultValue: null})
    @IsOptional()
    fechaRetiro: Date;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    hp: number;

    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesario asignar una marca'})
    marca: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesario asignar un modelo'})
    modelo: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @IsOptional()
    motivoRet: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesario colocar un numero de serie'})
    noSerie: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @IsOptional()
    observaciones: string;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    voltaje: number;

    @Field(() => String, {nullable: true, defaultValue: null})
    @IsOptional()
    descripcion: string;

    @Field(() => String, {nullable: true, defaultValue: null})
    @IsOptional()
    causasBaja: string;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    eficiencia: number;
}
