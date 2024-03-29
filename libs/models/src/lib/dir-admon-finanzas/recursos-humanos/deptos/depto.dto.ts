import {Field, ID, InputType, ObjectType, PickType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {IsNotEmpty, IsOptional, IsUppercase, Length} from 'class-validator';
import {IDepto, IRegPuesto} from './depto.interface';

// definimos el esquema para la base de datos y el tipo para la generacion del dsl de graphql en una sola clase
@ObjectType('DeptoType')
@InputType('DeptoInput')
@Schema({collection: 'Departamentos'})
export class DeptoDto implements IDepto
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id?: string;

    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El nombre del departamento es requerido'})
    nombre: string;

    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario asignar un centro gestor'})
    @Length(3, 4, {message: 'El centro gestor tiene que tener como minimo y maximo 3 caracteres'})
    @IsUppercase({message: 'El centro gestor debe estar en mayusculas'})
    centroGestor: string;

    @Field(() => [String], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    puestos: string[];
}

export type DeptoType = DeptoDto & Document;
export const SCHEMA_DEPTO = SchemaFactory.createForClass(DeptoDto).index({centroGestor: 1}, {unique: true});
// @Transform(({value}) =>
// {
//     const resp = value + ' Que pedo';
//     console.log('input', resp);
//     return resp;
// })

@InputType('PuestoDeptoInput')
export class RegPuestoDto extends PickType(DeptoDto, ['_id'], InputType) implements IRegPuesto
{
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Es necesario un puesto'})
    puesto: string;
}
