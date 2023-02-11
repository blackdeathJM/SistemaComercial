import {ITelemetria} from './telemetria.interface';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Field, ID, InputType, ObjectType, OmitType} from '@nestjs/graphql';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {BombaDto} from './bomba/bomba.dto';
import {InstalacionDto} from './instalacion/instalacion.dto';
import {MedidorDto} from './medidor/medidor.dto';
import {MotorDto} from './motor/motor.dto';

@InputType('TelemetriaInput')
@ObjectType('TelemetriaType')
@Schema({collection: 'Telemetria'})
export class TelemetriaDto implements ITelemetria
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id: string;
    @Field(() => [BombaDto], {nullable: true, defaultValue: []})
    @IsOptional()
    @Prop()
    bombas: BombaDto[];
    @Field(() => InstalacionDto, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'La instalacion es requerida'})
    @Prop()
    instalacion: InstalacionDto;
    @Field(() => [MedidorDto], {nullable: true, defaultValue: []})
    @IsOptional()
    @Prop()
    medidores: MedidorDto[];
    @Field(() => [MotorDto], {nullable: true, defaultValue: []})
    @IsOptional()
    @Prop()
    motores: MotorDto[];
}

export type TelemetriaType = TelemetriaDto & Document;
export const SCHEMA_TELEMETRIA = SchemaFactory.createForClass(TelemetriaDto);

@InputType('RegInstalacionInput')
export class RegInstalacionDto extends OmitType(TelemetriaDto, ['_id'], InputType)
{

}
