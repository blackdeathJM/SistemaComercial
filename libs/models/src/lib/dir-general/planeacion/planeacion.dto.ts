import {IPlaneacion} from './planeacion.interface';
import {ArgsType, Field, ID, InputType, Int, ObjectType, PickType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsBoolean, IsNotEmpty, IsOptional} from 'class-validator';
import {MirCuestionarioDto} from './mir/mir.dto';
import {PbrCuestionarioDto} from './pbr-usuarios/pbr.dto';

@ObjectType('PlaneacionType')
@InputType('PlaneacionInput')
@Schema({collection: 'Planeacion'})
export class PlaneacionDto implements IPlaneacion
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id: string;

    @Field(() => Boolean, {nullable: true})
    @Prop()
    @IsOptional()
    copia: boolean;

    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @Prop({unique: true})
    @IsOptional()
    ano: number;

    @Field(() => String, {nullable: true})
    @Prop()
    @IsOptional()
    descripcion: string;

    @Field(() => [MirCuestionarioDto], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    mirCuestionario: MirCuestionarioDto[];

    @Field(() => [PbrCuestionarioDto], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    pbrCuestionario: PbrCuestionarioDto[];
}

export type TPlaneacionType = PlaneacionDto;

export const SCHEMA_PLANEACION = SchemaFactory.createForClass(PlaneacionDto);

@ArgsType()
export class FilCentroGestorDto
{
    @IsNotEmpty({message: 'El id de planeacion es necesario'})
    @Field(() => ID, {nullable: true})
    _id: string;

    @IsNotEmpty({message: 'El centro gestor es necesario'})
    @Field(() => String, {nullable: true})
    centroGestor: string;

    @IsNotEmpty({message: 'Falta el tipo de cuestionario'})
    @Field(() => String, {nullable: true})
    cuestionario: string;
}

export type TFilCentroGestor = FilCentroGestorDto;

@ArgsType()
export class EliminarElementoDto
{
    @IsNotEmpty({message: 'El id es requerido'})
    @Field(() => ID, {nullable: true})
    _id: string

    @IsNotEmpty({message: 'El id del elemento es necesario'})
    @Field(() => String, {nullable: true})
    idIndicador: string;

    @IsNotEmpty({message: 'Es necesario el tipo de cuestionario'})
    @Field(() => String, {nullable: true})
    cuestionario: string;
}

export type TEliminarElemento = EliminarElementoDto;
