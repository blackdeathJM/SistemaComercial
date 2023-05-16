import {Field, Float, InputType, ObjectType, PartialType} from "@nestjs/graphql";
import {IComponente} from "./componente.interface";
import {IsNotEmpty, IsOptional} from "class-validator";
import {v4 as uuidv4} from 'uuid'

@ObjectType('ComponenteType')
@InputType('ComponenteInput')
export class ComponenteDto implements IComponente
{
    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: uuidv4()})
    id: string;
    @IsNotEmpty({message: 'Se requiere las cabeceras para la generacion del componente'})
    @Field(() => [String], {nullable: true, defaultValue: []})
    cabecera: string[];

    @IsNotEmpty({message: 'Se requieren los valores para cada una de las columnas generadas en la cabecera'})
    @Field(() => [String], {nullable: true, defaultValue: []})
    valor: string[];

    @IsOptional()
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    trimValor: number;

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    trimestre: string;

    @IsOptional()
    @Field(() => String, {nullable: true, defaultValue: null})
    etiqueta: string;
}

export class RegComponenteDto extends PartialType(ComponenteDto, InputType)
{
}

export type TRegComponente = RegComponenteDto;
