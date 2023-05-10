import {Field, Float, InputType, Int, ObjectType} from "@nestjs/graphql";
import {IComponente, formUno, IValoresAdicionales} from "./componente.interface";
import {IsArray, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {v4 as uuidv4} from 'uuid';

@ObjectType('ValoresAdicionalesType')
@InputType('ValoresAdicionalesInput')
export class ValoresAdicionalesDto implements IValoresAdicionales
{
    @IsNotEmpty({message: 'El nombre del campo es requerido'})
    @Field(() => String, {nullable: true, defaultValue: null})
    campo: string;

    @IsNumber({allowNaN: false}, {message: 'El valor debe ser numerico'})
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    valor: number;
}

@ObjectType('FormUnoType')
@InputType('FormUnoInput')
export class formUnoDto implements formUno
{
    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: uuidv4()})
    id: string;

    @IsNotEmpty({message: 'El id del indicador PBR no puede estar vacio en formulario tipo 1'})
    @Field(() => String, {nullable: true, defaultValue: null})
    idIndicador: string;
}

@ObjectType('ComponenteType')
@InputType('ComponenteInput')
export class ComponenteDto implements IComponente
{
    @IsNotEmpty({message: 'Es necesario especificar el tipo de formula para los calculos'})
    @Field(() => String, {nullable: true, defaultValue: null})
    formulaTrim: string;

    @IsNumber({allowNaN: false, maxDecimalPlaces: 0, allowInfinity: false}, {message: 'Es necesario especificar el tipo de formulario'})
    @Field(() => Int, {nullable: true, defaultValue: 1})
    tipoForm: number;

    @IsArray({message: 'Los datos del formulario debe ser un arreglo'})
    @Field(() => [formUnoDto], {nullable: true, defaultValue: []})
    formUno: formUnoDto[];

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim1: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim2: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim3: number;

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trim4: number;

    @IsOptional()
    @Field(() => [ValoresAdicionalesDto], {nullable: true, defaultValue: []})
    valoresAdicionales: ValoresAdicionalesDto[];
}
