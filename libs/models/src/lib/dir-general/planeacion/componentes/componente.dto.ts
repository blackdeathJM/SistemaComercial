import {Field, Float, ID, InputType, ObjectType, PartialType} from "@nestjs/graphql";
import {IComponente, IFormComun} from "./componente.interface";
// import {v4 as uuidv4} from 'uuid'
import {IsArray, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {GraphQLJSON} from "graphql-scalars";

@ObjectType('FormComunType')
@InputType('FormComunInput')
export class FormComunDto implements IFormComun
{
    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    idIndicador: string;

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    idIndicadorAd: string;

    @IsNumber({allowNaN: false}, {message: 'El valor debe ser numerico'})
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim1Ant: number;

    @IsNumber({allowNaN: false}, {message: 'El valor debe ser numerico'})
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim2Ant: number;

    @IsNumber({allowNaN: false}, {message: 'El valor debe ser numerico'})
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim3Ant: number;

    @IsNumber({allowNaN: false}, {message: 'El valor debe ser numerico'})
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim4Ant: number;
}

@ObjectType('ComponenteType')
@InputType('ComponenteInput')
export class ComponenteDto implements IComponente
{
    @IsOptional()
    @Field(() => [GraphQLJSON], {nullable: true, defaultValue: []})
    formDinamico: object[];

    @IsOptional()
    @Field(() => [FormComunDto], {nullable: true, defaultValue: []})
    formComun: FormComunDto[];

    @IsNotEmpty({message: 'Es necesario definir que tipo de valor son los trimestres'})
    @Field(() => String, {nullable: true, defaultValue: null})
    tipoValorTrim: string;

    @IsNotEmpty({message: 'Es necesario definir el tipo de valor que se mostraran los avances trimestrales'})
    @Field(() => String, {nullable: true, defaultValue: null})
    tipoValorAvance: string;

    @IsNotEmpty({message: 'Es necesario el tipo de formulario'})
    @Field(() => String, {nullable: true, defaultValue: null})
    tipoForm: string;

    @IsNotEmpty({message: 'Es necesario definir la formula para calcular el trimestre'})
    @Field(() => String, {nullable: true, defaultValue: null})
    formula: string;

    @IsArray({message: 'Los ids debe ser un array'})
    @Field(() => [String], {nullable: true, defaultValue: []})
    idsFormulario: string[];

    @IsArray({message: 'Las cabeceras de las columnas deben estar en un array'})
    @Field(() => [String], {nullable: true, defaultValue: []})
    colsTabla: string[];

    @IsArray({message: 'Los ids de la formula deben estar en un array'})
    @Field(() => [String], {nullable: true, defaultValue: []})
    idsFormula: string[];

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: ''})
    etiqueta: string;

    @IsOptional()
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    omitirPrimerId: boolean;
}

@InputType('RegComponenteInput')
export class RegComponenteDto extends PartialType(ComponenteDto, InputType)
{
    @IsNotEmpty({message: 'Es requerido el id principal'})
    @Field(() => ID, {nullable: true})
    _id: string;

    @IsNotEmpty({message: 'Es necesario el id del MIR'})
    @Field(() => String, {nullable: true})
    idIndicadorMir: string;
}

export type TRegComponente = RegComponenteDto;
