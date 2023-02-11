import {ILectura, IMedidor, IRecibosCfe, Meses} from './medidor.interface';
import {Field, Float, InputType, ObjectType, registerEnumType} from '@nestjs/graphql';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
import {GraphQLDate} from 'graphql-scalars';

registerEnumType(Meses, {name: 'Meses'});

@ObjectType('MedidorType')
@InputType('MedidorInput')
export class MedidorDto implements IMedidor
{
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @IsBoolean({message: 'Es necesario colocar el estado del medidor activo o no activo'})
    activo: boolean;
    @Field(() => GraphQLDate, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesaria la fecha de instalacion'})
    fechaInstalacion: Date;
    @Field(() => GraphQLDate, {nullable: true, defaultValue: null})
    @IsOptional()
    fechaRetiro: Date;
    @Field(() => [LecturaDto], {nullable: true, defaultValue: []})
    @IsOptional()
    lectura: LecturaDto[];
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsOptional()
    medidor: string;
    @Field(() => [RecibosDto], {nullable: true, defaultValue: []})
    @IsOptional()
    reciboCfe: RecibosDto[];
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesario colocar el numero de servicio que tienes en C.F.E'})
    servicio: string;
}

@ObjectType('LecturaType')
@InputType('LecturaInput')
export class LecturaDto implements ILectura
{
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    lectura: number;
    @Field(() => Meses, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesario colocar el mes'})
    mes: Meses;

}

@ObjectType('RecibosType')
@InputType('RecibosInput')
export class RecibosDto implements IRecibosCfe
{
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    costoKw: number;
    @Field(() => GraphQLDate, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'Es necesaria la fecha del recibo'})
    fecha: Date;
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsOptional()
    imgRecibo: string;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    lectura: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2})
    pago: number;
}
