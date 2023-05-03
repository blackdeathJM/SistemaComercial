import {ISumatorias} from './pbr.interface';
import {Field, Float, ID, InputType, Int, ObjectType, PartialType} from '@nestjs/graphql';
import {IsNotEmpty, IsOptional} from 'class-validator';

@ObjectType('PbrSumatoriaType')
@InputType('PbrSumatoriaInput')
export class PbrSumatoriaDto implements ISumatorias
{
    @IsNotEmpty({message: 'El centro gestor es requerido'})
    @Field(() => String, {nullable: true})
    centroGestor: string;

    @IsNotEmpty({message: 'La descripcion es necesaria'})
    @Field(() => String, {nullable: true})
    descripcion: string;

    @IsNotEmpty({message: 'Los ids son necesarios'})
    @Field(() => [String], {nullable: true, defaultValue: []})
    ids: string[];

    @IsNotEmpty({message: 'El nombre de la sumatoria es obligatoria'})
    @Field(() => String, {nullable: true})
    nombreSumatoria: string;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    total: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    abril: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    agosto: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    ano: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    diciembre: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    enero: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    febrero: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    julio: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    junio: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    marzo: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    mayo: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    noviembre: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    octubre: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    septiembre: number;
}

@InputType('RegSumPbrInput')
export class RegSumPbrDto extends PartialType(PbrSumatoriaDto, InputType)
{
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el id principal'})
    _id: string;
}

export type TRegSumPbr = RegSumPbrDto;
