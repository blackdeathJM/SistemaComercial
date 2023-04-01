import {ISeleccion} from './seleccion.interface';
import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsOptional} from 'class-validator';

@ObjectType('SeleccionType')
@InputType('SeleccionInput')
@Schema({collection: 'PlaneacionSelecciones'})
export class SeleccionDto implements ISeleccion
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id: string;

    @Field(() => [String], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    centroGestor: string[];

    @Field(() => [String], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    unidad: string[];

    @Field(() => [String], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    dimension: string[];

    @Field(() => [String], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    frecuencia: string[];

    @Field(() => [String], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    tipo: string[];
}

export type SeleccionType = SeleccionDto;
export const SCHEMA_SELECCION = SchemaFactory.createForClass(SeleccionDto);

export type TAgregarSeleccion = Omit<SeleccionType, | '_id'>;
