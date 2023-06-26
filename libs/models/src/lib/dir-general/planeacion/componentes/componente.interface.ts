export enum TiposFormulario
{
    COMUN = 'comun',
    PERIODO_ANT = 'periodoAnt',
    CON_OTRO_ID_PBR = 'conOtroDatoPbr',
    DIN = 'dinamico'
}

export enum AsigFormsComponente
{
    principal,
    adicional,
    formula
}

export enum TipoValoresTrim
{
    PESOS = 'pesos',
    PORCENTAJE = 'porcentaje',
    NUMERO = 'numero',
    DECIMAL = 'decimal',
    LTS = 'litros',
    MT3 = 'mt3'
}

export interface IFormComun
{
    idIndicador: string;

    idIndicadorAd: string;

    trim1Ant: number;
    trim2Ant: number;
    trim3Ant: number;
    trim4Ant: number;
    // Los datos de los trimestres se van a obtener dinamicamente
}

export interface IComponente
{
    formDinamico: object[];
    formComun: IFormComun[];

    idsFormulario: string[];
    idsFormula: string[];
    colsTabla: string[];
    formula: string;
    omitirPrimerId: boolean;

    tipoValorTrim: string;
    tipoValorAvance: string;

    tipoForm: string;
    etiqueta: string;
}
