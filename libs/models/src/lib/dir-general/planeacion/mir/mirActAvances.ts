import {TMirsActAvances} from './mir-consultas.dto';
import {notEmpty, numeric, NumericValueType, prop} from '@rxweb/reactive-form-validators';

export class MirActAvances implements TMirsActAvances
{
    @prop()
    _id: string;

    @notEmpty({message: 'El valor no puede estar vacio'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue:NumericValueType.PositiveNumber, persistZero: true})
    lineaBaseAno: number;

    @notEmpty({message: 'El valor no puede estar vacio'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue:NumericValueType.PositiveNumber, persistZero: true})
    lineaBaseValor: number;

    @notEmpty({message: 'El valor no puede estar vacio'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue:NumericValueType.PositiveNumber, persistZero: true})
    meta: number;

    @notEmpty({message: 'El valor no puede estar vacio'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue:NumericValueType.PositiveNumber, persistZero: true})
    semefVerde: number;

    @notEmpty({message: 'El valor no puede estar vacio'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue:NumericValueType.PositiveNumber, persistZero: true})
    semefAmarillo: number;

    @notEmpty({message: 'El valor no puede estar vacio'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue:NumericValueType.PositiveNumber, persistZero: true})
    semefRojo: number;

    @notEmpty({message: 'El valor no puede estar vacio'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue:NumericValueType.PositiveNumber, persistZero: true})
    avanceTrim1: number;

    @notEmpty({message: 'El valor no puede estar vacio'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue:NumericValueType.PositiveNumber, persistZero: true})
    avanceTrim2: number;

    @notEmpty({message: 'El valor no puede estar vacio'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue:NumericValueType.PositiveNumber, persistZero: true})
    avanceTrim3: number;

    @notEmpty({message: 'El valor no puede estar vacio'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue:NumericValueType.PositiveNumber, persistZero: true})
    avanceTrim4: number;
}
