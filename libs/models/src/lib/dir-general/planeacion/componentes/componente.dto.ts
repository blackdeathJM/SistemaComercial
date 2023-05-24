import {Field, Float, InputType, ObjectType, PartialType} from "@nestjs/graphql";
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
}

export class RegComponenteDto extends PartialType(ComponenteDto, InputType)
{
}

export type TRegComponente = RegComponenteDto;
