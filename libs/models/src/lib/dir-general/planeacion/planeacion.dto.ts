import {IPlaneacion} from './planeacion.interface';
import {Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsOptional} from 'class-validator';
import {MirCuestionarioDto} from './mir/mir.dto';
import {PbrCuestionarioDto} from './pbr-usuarios/pbr.dto';

@ObjectType('PlaneacionType')
@InputType('PlaneacionInput')
@Schema({collection: 'Planeacion'})
export class PlaneacionDto implements IPlaneacion
{
    @IsOptional()
    _id: string;

    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @Prop({unique: true})
    ano: number;

    @Field(() => [MirCuestionarioDto], {nullable: true, defaultValue: []})
    @Prop()
    mirCuestionario: MirCuestionarioDto[];

    @Field(() => [PbrCuestionarioDto], {nullable: true, defaultValue: []})
    @Prop()
    pbrCuestionario: PbrCuestionarioDto[];
}

export type PlaneacionType = PlaneacionDto;

export const SCHEMA_PLANEACION = SchemaFactory.createForClass(PlaneacionDto);

export type RegPlaneacion = Omit<PlaneacionType, '_id'>;
