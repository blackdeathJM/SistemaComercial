import {ITabla} from "../../../tabla.interface";

export enum TiposFormulario
{
    COMUN = 'comun',
    PERIODO_ANT = 'periodoAnt',
    CON_OTRO_ID_PBR = 'conOtroDatoPbr',
    PTAR = 'ptar'
}

export enum TipoValores
{
    PESOS = 'pesos',
    PORCENTAJE = 'porcentaje',
    NUMERO = 'numero',
    FECHA = 'fecha'
}

export interface IFormPlanta
{
    ptarE: string;
    sstE: number;
    dqoE: number;
    grasasAceitesE: number;
}

export interface IFormComun
{
    idIndicador: string;
    dato: string;

    idIndicadorAd: string;
    datoAd: string;

    trim1Ant: number;
    trim2Ant: number;
    trim3Ant: number;
    trim4Ant: number;

    // Los datos de los trimestres se van a obtener dinamicamente
}

export interface IComponente
{
    formPlanta: IFormPlanta[];
    formComun: IFormComun[];

    tablaColumnas: ITabla[];

    formula: string;

    tipoValorTrim: string;
    tipoValorAvance: string;

    tipoForm: string;
}
