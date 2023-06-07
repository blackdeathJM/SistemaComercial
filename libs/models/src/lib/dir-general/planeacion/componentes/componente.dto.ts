import {Field, Float, ID, InputType, ObjectType, PartialType} from "@nestjs/graphql";
import {IComponente, IFormComun, IFormPlanta} from "./componente.interface";
// import {v4 as uuidv4} from 'uuid'
import {IsArray, IsNotEmpty, IsNumber, IsOptional} from "class-validator";

@ObjectType('FormPlantaType')
@InputType('FormPlantaInput')
export class FormPlantaDto implements IFormPlanta
{
    @IsNotEmpty({message: 'Es necesario el PTAR'})
    @Field(() => String, {nullable: true, defaultValue: null})
    ptarE: string;

    @IsNumber({allowNaN: false}, {message: 'El SST debe ser un valor numerico'})
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    sstE: number;

    @IsNumber({allowNaN: false}, {message: 'El DQO debe ser un valor numerico'})
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    dqoE: number;

    @IsNumber({allowNaN: false}, {message: 'Las grasas y aceites deben ser un valor numerico'})
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    grasasAceitesE: number;
}

@ObjectType('FormComunType')
@InputType('FormComunInput')
export class FormComunDto implements IFormComun
{
    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    idIndicador: string;

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    dato: string;

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    idIndicadorAd: string;

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    datoAd: string;

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
    @Field(() => [FormPlantaDto], {nullable: true, defaultValue: []})
    formPlanta: FormPlantaDto[];

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
    ids: string[];
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
