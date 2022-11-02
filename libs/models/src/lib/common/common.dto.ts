import {ArgsType, Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import {IsNotEmpty, IsNumber, IsOptional, Min} from 'class-validator';
import {IModificado, IPaginacion} from './common.interface';
import {GraphQLJSON} from 'graphql-scalars';

@ObjectType('ModificadoPorType')
@InputType('ModificadoPorInput')
export class ModificadoPorDto implements IModificado
{
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Es requerida una accion'})
    accion: string;
    @Field(() => Int, {nullable: true, defaultValue: 0})
    @IsNotEmpty({message: 'Es necesaria una fecha'})
    @IsNumber({}, {message: 'La fecha debe estar en formato unix'})
    fecha: number;
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Es necesario colocar el usuario que estar realizando el cambio'})
    usuario: string;
    @Field(() => [GraphQLJSON], {nullable: true, defaultValue: null})
    @IsOptional()
    valorActual: object[];
    @Field(() => [GraphQLJSON], {nullable: true, defaultValue: null})
    @IsOptional()
    valorAnterior: object[];
}

@ArgsType()
export class PaginacionDto implements IPaginacion
{
    @Field(() => Int, {nullable: true})
    @IsOptional()
    @Min(1)
    limit: number;
    @Field(() => Int, {nullable: true})
    @IsOptional()
    @Min(1)
    offset: number;
}
