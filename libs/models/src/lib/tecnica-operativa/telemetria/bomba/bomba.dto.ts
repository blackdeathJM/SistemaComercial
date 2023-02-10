import {IBomba} from './bomba.interface';
import {Field, Float, InputType, Int, ObjectType} from '@nestjs/graphql';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

@ObjectType('BombaType')
@InputType('BombaInput')
export class BombaDto implements IBomba
{
    @Field(() => Boolean, {nullable: true, defaultValue: true})
    @IsBoolean({message: 'El valor activo debe ser un valor boolean'})
    activo: boolean;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'El diametro debe ser un valor numerico'})
    diametro: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'La eficiencia debe ser un valor numerico'})
    eficiencia: number;
    @Field(() => [String], {nullable: true, defaultValue: []})
    @IsOptional()
    evidenciaInst: string[];
    @Field(() => [String], {nullable: true, defaultValue: []})
    @IsOptional()
    evidenciaRetiro: string[];
    @Field(() => Date, {nullable: true})
    @IsNotEmpty({message: 'La fecha de instalacion es requerida'})
    fechaInstalacion: Date;
    @Field(() => Date, {nullable: true, defaultValue: null})
    @IsOptional()
    fechaRetiro: Date;
    @Field(() => Int, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    id: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    lts: number;
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesario colocar la marca de la bomba'})
    marca: string;
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesario colocar el modelo de la bomba'})
    model: string;
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesario colocar el motivo de retiro de la bomba'})
    motivoRet: string;
    @Field(() => Int, {nullable: true, defaultValue: null})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    @IsNotEmpty({message: 'Es necesario colocar el numero de impulsores'})
    noImpulsores: number;
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesario colocar un numero de serie de retiro de la bomba'})
    noSerie: string;
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsOptional()
    observaciones: string;
    @Field(() => Int, {nullable: true, defaultValue: null})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    rpm: number;
}
