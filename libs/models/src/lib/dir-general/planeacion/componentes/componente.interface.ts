import {ITabla} from "../../../tabla.interface";

export enum TiposFormulario
{
    COMUN = 'comun',
    PERIODO_ANT = 'periodoAnt',
    PTAR = 'ptar'
}

export enum TipoValores
{
    PESOS = 'Pesos',
    PORCENTAJE = 'Porcentaje',
    NUMERO = 'Numero'
}

export enum TipoDatoTabla
{
    fecha = 'fecha',
    obj = 'obj',
    numero = 'numero',
    flotante = 'flotante',
    porcentaje = 'porcentaje'
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
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;

    trim1Ant: number;
    trim2Ant: number;
    trim3Ant: number;
    trim4Ant: number;

    valorAdicional: number;
}

export interface IComponente
{
    formComun: IFormComun[];
    formPlanta: IFormPlanta[];

    tablaColumnas: ITabla[];

    tipoValorTrim: string;
    tipoValorAvance: string;
    valorAdicional: number;
    valorAdicionalB: boolean;

    tipoForm: string;
}
