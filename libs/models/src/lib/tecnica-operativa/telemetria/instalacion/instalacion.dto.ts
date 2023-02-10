import {IInstalacion} from './instalacion.interface';
import {Field, Float, InputType, ObjectType} from '@nestjs/graphql';
import {IsBoolean, IsNotEmpty, IsNumber} from 'class-validator';

@InputType('InstalacionInput')
@ObjectType('InstalacionType')
export class InstalacionDto implements IInstalacion
{
    @Field(() => Boolean, {nullable: true})
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
}
