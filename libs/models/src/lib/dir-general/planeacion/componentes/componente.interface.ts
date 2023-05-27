export enum TiposFormulario
{
    COMUN = 'comun',
    UN_VALOR = 'unValor',
    PERIODO_ANT = 'periodoAnt',
    PTAR = 'ptar'
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
    idIndicador: string;
    dato: string;
    //Estos valores son recogidos de los trimestres establecidos en pbr
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;

    trim1Anterior: number;
    trim2Anterior: number;
    trim3Anterior: number;
    trim4Anterior: number;
}

export interface IComponente
{
    formComun: IformComun[];
    formPlanta: IFormPlanta[];
    etiqueta: string;
    tipoForm: string;

    avanceTrim1: number;
    avanceTrim2: number;
    avanceTrim3: number;
    avanceTrim4: number;
}
