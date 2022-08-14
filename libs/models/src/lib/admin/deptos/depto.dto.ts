import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {IsNotEmpty, IsUppercase, Length} from 'class-validator';
import {IDepto} from '@sistema-comercial/models';

// definimos el esquema para la base de datos y el tipo para la generacion del dsl de graphql en una sola clase
@ObjectType('DeptoType')
@InputType('DeptoInput')
@Schema({collection: 'departamentos'})
export class DeptoDto implements IDepto
{
    @Field(() => ID, {nullable: true})
    _id?: string;

    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El nombre del departamento es requerido'})
    nombre: string;

    @Field({nullable: true})
    @Prop({unique: true})
    @IsNotEmpty({message: 'Es necesario asignar un centro gestor'})
    @Length(3, 3, {message: 'El centro gestor tiene que tener como minimo y maximo 3 caracteres'})
    @IsUppercase({message: 'El centro gestor debe estar en mayusculas'})
    centroGestor: string;
}

export type DeptoType = DeptoDto & Document;
export const DEPTO_SCHEMA = SchemaFactory.createForClass(DeptoDto);
