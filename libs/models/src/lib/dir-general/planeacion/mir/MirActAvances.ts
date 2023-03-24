import {TMirsActAvances} from './mir-consultas.dto';
import {numeric, NumericValueType, prop, required} from '@rxweb/reactive-form-validators';

export class MirActAvances implements TMirsActAvances
{
    @prop()
    _id: string;

    @required({message: 'El valor no puede estar vacio-1'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue: NumericValueType.PositiveNumber, persistZero: true})
    lineaBaseAno: number;

    @required({message: 'El valor no puede estar vacio-2'})
    lineaBaseValor: string;

    @required({message: 'El valor no puede estar vacio-4'})
    @numeric({message: 'El valor debe ser un numero', allowDecimal: true, acceptValue: NumericValueType.PositiveNumber, persistZero: true})
    meta: number;

    @prop()
    semefVerde: number;

    @prop()
    semefAmarillo: number;

    @prop()
    semefRojo: number;
}
