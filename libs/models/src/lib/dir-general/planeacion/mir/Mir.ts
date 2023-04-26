import {numeric, NumericValueType, prop, required} from '@rxweb/reactive-form-validators';
import {sanitize, toFloat, upperCase} from '@rxweb/sanitizers';
import {TRegMir} from './mir.dto';

@sanitize
export class Mir implements TRegMir
{
    @required()
    idEmpleado: string;

    @required()
    correo: string;

    @prop()
    responsable: string;

    @required()
    centroGestor: string;

    @required()
    dimension: string;

    @prop({defaultValue: false})
    esActualizar: boolean;

    @required()
    frecuenciaMedicion: string;

    @upperCase()
    @required()
    idIndicador: string;

    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: false})
    lineaBaseAno: number = new Date().getFullYear();

    @prop()
    lineaBaseValor: string;

    @prop()
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, message: 'El valor de la meta debe ser numerico'})
    @required()
    meta: number;

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

    @required()
    sentidoDelIndicador: string;

    @required()
    tipo: string;

    @required()
    unidadDeMedida: string;

    @toFloat()
    @required()
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true})
    semefVerdeV: number;

    @toFloat()
    @required()
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true})
    semefAmarilloV: number;

    @toFloat()
    @required()
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true})
    semefRojoV: number;
}
