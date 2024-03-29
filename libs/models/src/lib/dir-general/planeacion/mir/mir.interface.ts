import {IComponente} from "../componentes/componente.interface";

export interface IMirCuestionario
{
    idIndicador: string;
    idEmpleado: string;
    correo: string;
    responsable: string;
    nivel: string;
    supuestos: string;
    mediosVerificacion: string;
    definicionIndicador: string;
    programaFinanciacion: string;
    resumenNarrativo: string;
    centroGestor: string;
    nombreDelIndicador: string;
    tipo: string;
    dimension: string;
    metodoCalculo: string;
    unidadDeMedida: string;
    frecuenciaMedicion: string;
    lineaBaseAno: string;
    lineaBaseValor: string;
    meta: number;
    sentidoDelIndicador: string;

    semefVerde: number;
    semefVerdeV: number;
    semefAmarillo: number;
    semefAmarilloV: number;
    semefRojo: number;
    semefRojoV: number;

    avanceTrim1: number;
    avanceTrim2: number;
    avanceTrim3: number;
    avanceTrim4: number;
    avanceAnual: number;

    componente: IComponente;
}
