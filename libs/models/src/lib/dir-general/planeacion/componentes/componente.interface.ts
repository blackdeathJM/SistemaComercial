export enum TiposFormulario
{
    COMUN = 'comun',
    PERIODO_ANT = 'periodoAnt',
    CON_OTRO_ID_PBR = 'conOtroDatoPbr',
    PTAR = 'ptar'
}

export enum AsigFormsComponente
{
    principal,
    adicional,
    formula
}

export enum TipoValores
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

    ids: string[];
    formula: string;

    tipoValorTrim: string;
    tipoValorAvance: string;

    tipoForm: string;
    etiqueta: string;
}
