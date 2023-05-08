import {IComponente1, IOtrosDatos} from "./componente.interface";
import {Field, Float, InputType, ObjectType} from "@nestjs/graphql";
import {IsBoolean, IsNotEmpty, IsOptional} from "class-validator";

@ObjectType('OtrosDatosType')
@InputType('OtrosDatosInput')
export class OtrosDatosDto implements IOtrosDatos
{
    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    nombreCampo: string;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    valor: number;
}

@ObjectType('Componente1Type')
@InputType('Componente1Input')
export class Componente1Dto implements IComponente1
{
    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    avanceTrim1: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    avanceTrim2: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    avanceTrim3: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    avanceTrim4: number;

    @IsNotEmpty({message: 'La descripcion es requerida'})
    @Field(() => String, {nullable: true, defaultValue: null})
    descripcion: string;

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    formCalTrim1: string;

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    formCalTrim2: string;

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    formCalTrim3: string;

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    formCalTrim4: string;

    @IsNotEmpty({message: 'Es necesario el id del PBR'})
    @Field(() => String, {nullable: true, defaultValue: null})
    idIndicador: string;

    @IsBoolean({message: 'El valor debe ser boleano'})
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    obtenerValorPorMes: boolean;

    @IsOptional()
    @Field(() => [OtrosDatosDto], {nullable: true, defaultValue: []})
    otroCampo: OtrosDatosDto[];

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    valor: number;
}
