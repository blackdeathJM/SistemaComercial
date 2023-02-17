import {ITelemetria, TActInst, TAgregarBomba, TAgregarMotor, TRegInstalacion} from './telemetria.interface';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {createUnionType, Field, ID, InputType, ObjectType, PickType} from '@nestjs/graphql';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {BombaDto} from './bomba/bomba.dto';
import {InstalacionDto} from './instalacion/instalacion.dto';
import {MedidorDto} from './medidor/medidor.dto';
import {MotorDto} from './motor/motor.dto';
import {ErroresDto} from '../../errors/errores.dto';

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

export const unionTele = createUnionType({
    name: 'UnionTele',
    types: () => [TelemetriaDto, ErroresDto] as const,
    resolveType: (value) =>
    {
        if (value._id)
        {
            return TelemetriaDto;
        }
        if (value.error)
        {
            return ErroresDto;
        }
        return null;
    }
});

@InputType('RegInstalacionInput')
export class RegInstalacionDto extends PickType(TelemetriaDto, ['instalacion'], InputType) implements TRegInstalacion
{

}

@InputType('AgregarMotorInput')
export class AgregarMotorDto extends PickType(TelemetriaDto, ['_id', 'motores'], InputType) implements TAgregarMotor
{

}

@InputType('AgregarBombaInput')
export class AgregarBombaDto extends PickType(TelemetriaDto, ['_id', 'bombas'], InputType) implements TAgregarBomba
{

}

@InputType('ActInstInput')
export class ActInstDto extends PickType(TelemetriaDto, ['_id', 'instalacion']) implements TActInst
{

}
