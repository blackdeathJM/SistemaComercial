import {AscDesc, IMir} from './mir.interface';
import {numeric, NumericValueType, prop, required} from '@rxweb/reactive-form-validators';

export class Mir implements IMir
{
    _id: string;

    @prop({defaultValue: new Date().getFullYear()})
    ano: number;

    @prop({defaultValue: 0.00})
    avanceAnual: number;

    @prop({defaultValue: 0.00})
    @numeric({message: 'El avance trimestral debe ser numerico', allowDecimal: true, acceptValue: NumericValueType.Both})
    avanceTrim1: number = 0;

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

    @required({message: 'Asigna un identificador'})
    idIndicador: string;

    @prop({defaultValue: 2022})
    @numeric({message: 'La linea base para año debe ser un numero', allowDecimal: true, acceptValue: NumericValueType.Both})
    lineaBaseAno: number;

    @prop({defaultValue: 0.00})
    @numeric({message: 'El valor debe ser un valor numerico', allowDecimal: true, acceptValue: NumericValueType.Both})
    lineaBaseValor: number;

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

    @prop({defaultValue: 0.00})
    sentidoDelIndicador: AscDesc;

    @required({message: 'Es necesario colocar un supuesto'})
    supuestos: string;

    @required({message: 'Coloca el tipo'})
    tipo: string;

    @required({message: 'Asigna una unidad de medicion'})
    unidadDeMedida: string;
}
