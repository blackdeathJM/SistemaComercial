import {IMedicion} from './comun.interface';
import {numeric, NumericValueType, notEmpty, prop} from '@rxweb/reactive-form-validators';

export class Medicion implements IMedicion
{
    @prop()
    ano: number;

    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    abril: number;
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    agosto: number;
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    diciembre: number;
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    enero: number;
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    febrero: number;
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    julio: number;
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    junio: number;
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    marzo: number;
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    mayo: number;
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    noviembre: number;
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    octubre: number;
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Debe ser num'})
    @notEmpty({message: 'No vacio'})
    septiembre: number;
}

export enum Meses
{
    ano = 'ano',
    enero = 'enero',
    febrero = 'febrero',
    marzo = 'marzo',
    abril = 'abril',
    mayo = 'mayo',
    junio = 'junio',
    julio = 'julio',
    agosto = 'agosto',
    septiembre = 'septiembre',
    octubre = 'octubre',
    noviembre = 'noviembre',
    diciembre = 'diciembre',
    accion = 'accion'
}
