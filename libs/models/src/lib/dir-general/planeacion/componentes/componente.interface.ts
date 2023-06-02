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
    // esIdIndicador: boolean;
    // valorAdicional: number;
}

export interface IComponente
{
    formComun: IFormComun[];
    formPlanta: IFormPlanta[];

    tablaColumnas: ITabla[];

    tipoValorTrim: string;
    tipoValorAvance: string;

    // esIdIndicador: boolean;
    valorAdicional: number;
    valorAdicionalB: boolean;

    tipoForm: string;
}
