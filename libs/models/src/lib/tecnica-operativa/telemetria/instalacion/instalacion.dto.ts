import {Field, Float, ID, InputType, Int, ObjectType} from '@nestjs/graphql';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
import {IMedicion} from '../comun.interface';
import {IInstalacion, ITomarMedicion} from './instalacion.interface';

@InputType('InstalacionInput')
@ObjectType('InstalacionType')
export class InstalacionDto implements IInstalacion
{
    @Field(() => Boolean, {nullable: true, defaultValue: true})
    @IsBoolean({message: 'El valor activo debe ser un booleano'})
    activo: boolean;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2}, {message: 'El diametro de ademe debe ser un numero flotante'})
    diamAdeme: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2}, {message: 'El diametro de columna debe ser un numero flotante'})
    diamCol: number;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2}, {message: 'El diametro de perforacion debe ser un numero flotante'})
    diamPerforacion: number;

    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'La direccion de la instalacion no puede estar vacia'})
    direccion: string;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2}, {message: 'La longitud de columna debe ser un numero'})
    longCol: number;

    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'El nombre de la instalacion no puede estar vacio'})
    nombre: string;

    @Field(() => Float, {nullable: true, defaultValue: 0})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2}, {message: 'La profundidad del pozo debe ser numerica'})
    profPozo: number;

    @Field(() => String, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'El tipo de instalacion no puede estar vacia solo puedes escoger Pozo o Tanque'})
    tipoInstalacion: 'Pozo' | 'Tanque';

    @Field(() => [MedicionDto], {nullable: true, defaultValue: []})
    @IsOptional()
    nivelDinamico: MedicionDto[];

    @Field(() => [MedicionDto], {nullable: true, defaultValue: []})
    @IsOptional()
    nivelEstatico: MedicionDto[];
}

@ObjectType('MedicionType')
@InputType('MedicionInput')
export class MedicionDto implements IMedicion
{
    @Field(() => Int, {nullable: true, defaultValue: new Date().getFullYear()})
    @IsOptional({message: 'Es necesario el año'})
    ano: number;

    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    abril: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    agosto: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    diciembre: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    enero: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    febrero: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    julio: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    junio: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    marzo: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    mayo: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    noviembre: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    octubre: number;
    @Field(() => Float, {nullable: true, defaultValue: 0.00})
    @IsOptional()
    septiembre: number;
}

@InputType('TomarMedicionInput')
export class TomarMedicionDto extends MedicionDto implements ITomarMedicion
{
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'El id de la instalacion es necesario'})
    _id: string;
    @Field(() => String, {nullable: true, defaultValue: 'instalacion.nivelDinamico'})
    @IsNotEmpty({message: 'Coloca el tipo de nivel'})
    tipoNivel: 'instalacion.nivelDinamico' | 'instalacion.nivelEstatico';
}
