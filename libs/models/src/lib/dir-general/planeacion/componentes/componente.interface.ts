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

export interface IformComun
{
    idIndicador: ICampoStr;
    dato: ICampoStr;
    //Estos valores son recogidos de los trimestres establecidos en pbr
    trim1: ICampoNum;
    trim2: ICampoNum;
    trim3: ICampoNum;
    trim4: ICampoNum;

    trim1Anterior: ICampoNum;
    trim2Anterior: ICampoNum;
    trim3Anterior: ICampoNum;
    trim4Anterior: ICampoNum;

    valorAdicional: ICampoNum;
}

export interface IFormComunCols
{
    def: string;
}

export interface IComponente
{
    formComun: IformComun[];
    formComunCol: IFormComunCols[];

    formPlanta: IFormPlanta[];
    tipoValorTrim: string;
    tipoValorAvance: string;
    valorAdicional: ICampoNum;
    valorAdicionalUnico: boolean;
    tipoForm: string;
}
