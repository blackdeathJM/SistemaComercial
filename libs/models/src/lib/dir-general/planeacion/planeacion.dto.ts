import {IPlaneacion} from './planeacion.interface';
import {Field, ID, InputType, Int, ObjectType, OmitType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsOptional} from 'class-validator';
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
    copia: boolean;

    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @Prop({unique: true})
    ano: number;

    @Field(() => String, {nullable: true})
    @Prop()
    descripcion: string;

    @Field(() => [MirCuestionarioDto], {nullable: true, defaultValue: []})
    @Prop()
    mirCuestionario: MirCuestionarioDto[];

    @Field(() => [PbrCuestionarioDto], {nullable: true, defaultValue: []})
    @Prop()
    pbrCuestionario: PbrCuestionarioDto[];
}

export type PlaneacionType = PlaneacionDto;

export const SCHEMA_PLANEACION = SchemaFactory.createForClass(PlaneacionDto);

@InputType('IniPlaneacionInput')
export class IniPlaneacionDto extends OmitType(PlaneacionDto, ['_id'], InputType)
{

}

export type TIniPlaneacion = IniPlaneacionDto;
