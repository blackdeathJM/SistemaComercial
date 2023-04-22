import { numeric, NumericValueType, prop, required } from '@rxweb/reactive-form-validators';
import { sanitize, toFloat, upperCase } from '@rxweb/sanitizers';
import { TRegMir } from './mir.dto';

@sanitize
export class Mir implements TRegMir
{
    @prop()
    _id: string;

    @toFloat()
    @prop({ defaultValue: 0.00 })
    avanceAnual: number;

    @toFloat()
    @prop({ defaultValue: 0.00 })
    avanceTrim1: number;

    @toFloat()
    @prop({ defaultValue: 0.00 })
    avanceTrim2: number;

    @toFloat()
    @prop({ defaultValue: 0.00 })
    avanceTrim3: number;

    @toFloat()
    @prop({ defaultValue: 0.00 })
    avanceTrim4: number;

    @required()
    centroGestor: string;

    @required()
    dimension: string;

    @prop({ defaultValue: false })
    esActualizar: boolean;

    @prop({ defaultValue: '' })
    formulaAnual: string;

    @prop({ defaultValue: '' })
    formulaTrim1: string;

    @prop({ defaultValue: '' })
    formulaTrim2: string;

    @prop({ defaultValue: '' })
    formulaTrim3: string;

    @prop({ defaultValue: '' })
    formulaTrim4: string;

    @required()
    frecuenciaMedicion: string;

    @upperCase()
    @required()
    idIndicador: string;

    @numeric({ acceptValue: NumericValueType.PositiveNumber, allowDecimal: false })
    lineaBaseAno: number = new Date().getFullYear();

    @prop({ defaultValue: '' })
    lineaBaseValor: string;


    @prop({ defaultValue: '' })
    meta: string;

    @required()
    metodoCalculo: string;

    @required()
    nivel: string;

    @required()
    nombreDelIndicador: string;

    @required()
    programaFinanciacion: string;

    @required()
    resumenNarrativo: string;

    @prop({ defaultValue: 0.00 })
    semefAmarillo: number;

    @prop({ defaultValue: 0.00 })
    semefRojo: number;

    @prop({ defaultValue: 0.00 })
    semefVerde: number;

    @required()
    sentidoDelIndicador: string;

    @required()
    tipo: string;

    @required()
    unidadDeMedida: string;
}
