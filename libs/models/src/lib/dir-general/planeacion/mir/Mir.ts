import { maxNumber, minNumber, numeric, NumericValueType, prop, required } from '@rxweb/reactive-form-validators';
import { sanitize, upperCase } from '@rxweb/sanitizers';

@sanitize
export class Mir
{

    @required()
    @numeric({message: 'El año es requerido', allowDecimal: false, acceptValue: NumericValueType.PositiveNumber, persistZero: false})
    @maxNumber({message: 'El valor maximo es 2050', value: 2050})
    @minNumber({message: 'Solo puedes resgistrar desde el 2020', value: 2020})
    ano: number;

    @prop({defaultValue: 0.00})
    avanceAnual: number;

    @prop({defaultValue: 0.00})
    @numeric({message: 'El avance trimestral debe ser numerico', allowDecimal: true, acceptValue: NumericValueType.Both})
    avanceTrim1: number;

    @prop({defaultValue: 0.00})
    @numeric({message: 'El avance trimestral debe ser numerico', allowDecimal: true, acceptValue: NumericValueType.Both})
    avanceTrim2: number;

    @prop({defaultValue: 0.00})
    @numeric({message: 'El avance trimestral debe ser numerico', allowDecimal: true, acceptValue: NumericValueType.Both})
    avanceTrim3: number = 0;

    @prop({defaultValue: 0.00})
    @numeric({message: 'El avance trimestral debe ser numerico', allowDecimal: true, acceptValue: NumericValueType.Both})
    avanceTrim4: number;

    @required({message: 'El centro gestor es requerido'})
    centroGestor: string;

    @required({message: 'La dimension es requerida'})
    dimension: string;

    @required({message: 'Coloca la frecuencia de medicion'})
    frecuenciaMedicion: string;

    @upperCase()
    @required({message: 'Asigna un identificador'})
    idIndicador: string;

    @prop({defaultValue: 0})
    lineaBaseAno: number;

    @prop({defaultValue: null})
    lineaBaseValor: string;

    @prop({defaultValue: 0.00})
    @numeric({message: 'La meta debe ser un valor numerico', allowDecimal: true, acceptValue: NumericValueType.Both})
    meta: number;

    @required({message: 'Asigna el metodo de calculo'})
    metodoCalculo: string;

    @required({message: 'Es necesario el calculo de verificacion'})
    mediosDeVerificacion: string;

    @required({message: 'Es necesario el nivel'})
    nivel: string;

    @required({message: 'Es necesario el nombre del indicador'})
    nombreDelIndicador: string;

    @required({message: 'Es necesario el programa de financiacion'})
    programaFinanciacion: string;

    @required({message: 'Es necesario el resumen narrativo'})
    resumenNarrativo: string;

    @prop({defaultValue: 0.00})
    @numeric({message: 'La meta debe ser un valor numerico', allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    semefAmarillo: number;

    @prop({defaultValue: 0.00})
    @numeric({message: 'La meta debe ser un valor numerico', allowDecimal: true, acceptValue: NumericValueType.Both})
    semefRojo: number;

    @prop({defaultValue: 0.00})
    @numeric({message: 'La meta debe ser un valor numerico', allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    semefVerde: number = 0;

    @required({message: 'Selecciona el sentido del indicador'})
    sentidoDelIndicador: string;

    @required({message: 'Es necesario colocar un supuesto'})
    supuestos: string;

    @required({message: 'Coloca el tipo'})
    tipo: string;

    @required({message: 'Asigna una unidad de medicion'})
    unidadDeMedida: string;

    @prop({defaultValue: ''})
    formulaTrim1: string;

    @prop({defaultValue: ''})
    formulaTrim2: string;

    @prop({defaultValue: ''})
    formulaTrim3: string;

    @prop({defaultValue: ''})
    formulaTrim4: string;

    @prop({defaultValue: ''})
    formulaAnual: string;
}
