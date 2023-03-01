import {AscDesc, IMir} from './mir.interface';
import {prop} from '@rxweb/reactive-form-validators';

export class Mir implements IMir
{
    _id: string;
    @prop({defaultValue: new Date().getFullYear()})
    ano: number;
    @prop({defaultValue: 0.00})
    avanceAnual: number;
    @prop({defaultValue: 0.00})
    avanceTrim1: number = 0;
    avanceTrim2: number = 0;
    avanceTrim3: number = 0;
    avanceTrim4: number = 0;
    centroGestor: string;
    dimension: string;
    frecuenciaMedicion: string;
    idIndicador: string;
    lineaBaseAno: number;
    lineaBaseValor: number;
    meta: number;
    metodoCalculo: string;
    metodoDeVerificacion: string;
    nivel: string;
    nombreDelIndicador: string;
    programaFinanciacion: string;
    resumenNarrativo: string;
    semefAmarillo: number = 0;
    semefRojo: number = 0;
    semefVerde: number = 0;
    sentidoDelIndicador: AscDesc;
    supuestos: string;
    tipo: string;
    unidadDeMedida: string;

}
