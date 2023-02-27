import {ISeleccion} from './seleccion.interface';
import {Field, InputType, ObjectType, PickType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsOptional} from 'class-validator';

@ObjectType('SeleccionType')
@InputType('SeleccionInput')
@Schema({collection: 'PlaneacionSelecciones'})
export class SeleccionDto implements ISeleccion
{
    @Field(() => String, {nullable: true, defaultValue: []})
    @Prop({unique: true})
    @IsOptional()
    centroGestor: string[];
}

export type SeleccionType = SeleccionDto & Document;
export const SCHEMA_SELECCION = SchemaFactory.createForClass(SeleccionDto);

@InputType('AgregarCentroGestorInput')
export class AgregarCentroGestorDto extends PickType(SeleccionDto, ['centroGestor'], InputType)
{
}
