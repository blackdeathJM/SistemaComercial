import {IPlaneacion} from './planeacion.interface';
import {ArgsType, Field, ID, InputType, Int, ObjectType, PickType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {MirCuestionarioDto} from './mir/mir.dto';
import {PbrCuestionarioDto} from './pbr-usuarios/pbr.dto';
import {PbrSumatoriaDto} from './pbr-usuarios/pbrSumatoria.dto';

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

    @Field(() => [PbrSumatoriaDto], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    pbrSumatoria: PbrSumatoriaDto[];
}

export type TPlaneacionType = PlaneacionDto;

export const SCHEMA_PLANEACION = SchemaFactory.createForClass(PlaneacionDto);

@ArgsType()
export class EliminarElementoDto
{
    @IsNotEmpty({message: 'El id es requerido'})
    @Field(() => ID, {nullable: true})
    _id: string;

    @IsNotEmpty({message: 'El id del elemento es necesario'})
    @Field(() => String, {nullable: true})
    idIndicador: string;

    @IsNotEmpty({message: 'Es necesario el tipo de cuestionario'})
    @Field(() => String, {nullable: true})
    cuestionario: string;
}

export type TEliminarElemento = EliminarElementoDto;

@ArgsType()
export class ActualizarResponsableDto
{
    @IsNotEmpty({message: 'Es necesario el id de la coleccion'})
    @Field(() => ID, {nullable: true})
    _id: string;

    @IsNotEmpty({message: 'El id del empleado es requerido'})
    @Field(() => ID, {nullable: true})
    idEmpleado: string;

    @IsNotEmpty({message: 'Es necesario el id anterior'})
    @Field(() => ID, {nullable: true})
    idEmpleadoAnterior: string;

    @IsNotEmpty({message: 'El correo es necesario'})
    @Field(() => String, {nullable: true})
    correo: string;

    @IsNotEmpty({message: 'El nombre del responsable es requerido'})
    @Field(() => String, {nullable: true})
    responsable: string;

    @IsNotEmpty({message: 'El tipo de cuestionario es necesario'})
    @Field(() => String, {nullable: true})
    cuestionario: string;
}

export type TActualizarResponsable = ActualizarResponsableDto;

@ArgsType()
export class FilPorAnoDto extends PickType(PlaneacionDto, ['ano'], ArgsType)
{

}

export type TFilPorAno = FilPorAnoDto;
