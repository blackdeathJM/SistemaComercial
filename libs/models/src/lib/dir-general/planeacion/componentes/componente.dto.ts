import {Field, Float, ID, InputType, ObjectType, PartialType} from "@nestjs/graphql";
import {ICampoNum, ICampoStr, IComponente, IFormComun, IFormPlanta} from "./componente.interface";
// import {v4 as uuidv4} from 'uuid'
import {IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {ITabla} from "../../../tabla.interface";

@ObjectType('TablaType')
@InputType('TablaInput')
export class TablaDto implements ITabla
{
    @IsNotEmpty({message: 'Es necesaria la definicion para la columna'})
    @Field(() => String, {nullable: true, defaultValue: null})
    def: string;


    etiqueta: string;
    formato: string;
    html: string;
    llaveDato: string;
    tipoDeDato: "date" | "object" | "number";
    width: string;
}

@ObjectType('CampoStrType')
@InputType('CampoStrInput')
export class CampoStrDto implements ICampoStr
{
    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    def: string;

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    valor: string;
}

@ObjectType('CampoNumType')
@InputType('CampoNumInput')
export class CampoNumDto implements ICampoNum
{
    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    def: string;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    valor: number;
}

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
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim1: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim2: number;
    //
    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim3: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim4: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim1Ant: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim2Ant: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim3Ant: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim4Ant: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    valorAdicional: number
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

    @IsOptional()
    @Field(() => CampoNumDto, {nullable: true, defaultValue: null})
    valorAdicional: CampoNumDto;

@IsOptional()
@Field(() => Boolean, {nullable: true, defaultValue: true});
    valorAdicionalB: boolean;

    @IsOptional()
    @Field()
    tablaColumnas: ITabla[];
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
