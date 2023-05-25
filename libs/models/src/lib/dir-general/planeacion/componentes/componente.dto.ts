import {Field, Float, ID, InputType, ObjectType, PartialType} from "@nestjs/graphql";
import {IComponente, IformComun, IFormPlanta} from "./componente.interface";
// import {v4 as uuidv4} from 'uuid'
import {IsNotEmpty, IsNumber, IsOptional} from "class-validator";

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
export class FormComunDto implements IformComun
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
    trim1Anterior: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim2Anterior: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim3Anterior: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim4Anterior: number;
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

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    etiqueta: string;

    @IsNotEmpty({message: 'Es necesario el tipo de formulario'})
    @Field(() => String, {nullable: true, defaultValue: null})
    tipoForm: string;

    @IsOptional()
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    periodoAnt: boolean;

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
