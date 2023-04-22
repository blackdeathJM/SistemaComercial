import {numeric, NumericValueType, prop, required} from '@rxweb/reactive-form-validators';
import {sanitize, upperCase} from '@rxweb/sanitizers';
import {IMirCuestionario} from './mir.interface';
import {TRegMir} from "./mir.dto";
import {idPlaneacion} from "../../../../../../../apps/sistema-comercial/src/app/modules/dir-general/planeacion/store/planeacion.service";

@sanitize
export class Mir implements TRegMir
{
    @prop()
    _id: string;

    avanceAnual: number;
    avanceTrim1: number;
    avanceTrim2: number;
    avanceTrim3: number;
    avanceTrim4: number;
    centroGestor: string;
    dimension: string;
    esActualizar: boolean;
    formulaAnual: string;
    formulaTrim1: string;
    formulaTrim2: string;
    formulaTrim3: string;
    formulaTrim4: string;
    frecuenciaMedicion: string;
    idIndicador: string;
    lineaBaseAno: number;
    lineaBaseValor: string;
    mediosDeVerificacion: string;
    meta: number;
    metodoCalculo: string;
    nivel: string;
    nombreDelIndicador: string;
    programaFinanciacion: string;
    resumenNarrativo: string;
    semefAmarillo: number;
    semefRojo: number;
    semefVerde: number;
    sentidoDelIndicador: string;
    supuestos: string;
    tipo: string;
    unidadDeMedida: string;

}
