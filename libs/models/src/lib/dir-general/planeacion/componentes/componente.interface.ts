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

export interface ICampoStr
{
    def: string;
    valor: string;
}

export interface ICampoNum
{
    def: string;
    valor: number;
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
    //Estos valores son recogidos de los trimestres establecidos en pbr
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
    valorAdicional: ICampoNum;
    valorAdicionalB: boolean;

    tipoForm: string;
}
