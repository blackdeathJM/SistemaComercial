import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {IsNotEmpty, IsUppercase, Length} from 'class-validator';
import {IDepto} from './depto.interface';
import {Transform} from 'class-transformer';

// definimos el esquema para la base de datos y el tipo para la generacion del dsl de graphql en una sola clase
@ObjectType('DeptoType')
@InputType('DeptoInput')
@Schema({collection: 'Departamentos'})
export class DeptoDto implements IDepto
{
    @Field(() => ID, {nullable: true})
    _id?: string;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El nombre del departamento es requerido'})
        // @Transform(({value}) =>
        // {
        //     const resp = value + ' Que pedo';
        //     console.log('input', resp);
        //     return resp;
        // })
    nombre: string;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario asignar un centro gestor'})
    @Length(3, 3, {message: 'El centro gestor tiene que tener como minimo y maximo 3 caracteres'})
    @IsUppercase({message: 'El centro gestor debe estar en mayusculas'})
    centroGestor: string;
}

export type DeptoType = DeptoDto & Document;
export const SCHEMA_DEPTO = SchemaFactory.createForClass(DeptoDto).index({centroGestor: 1}, {unique: true});
