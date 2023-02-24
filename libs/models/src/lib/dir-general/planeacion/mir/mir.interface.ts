export enum AscDesc
{
    ascendente = 'Ascendente',
    descendente = 'Descendente'
}

export interface IMir
{
    _id: string;
    ano: number;
    idIndicador: string;
    nivel: string;
    programaFinanciacion: string;
    resumenNarrativo: string;
    centroGestor: string
    nombreDelIndicador: string;
    caracteriticas: ICaracterisitca;
    metodoCalculo: string;
    metodoDeVerificacion: string;
    supuestos: string;
    unidadDeMedida: string;
    frecuenciaMedicion: string;
    lineaBase: ILineaBase;
    meta: number;
    sentidoDelIndicador: AscDesc;
    parametroDeSemaforizacion: IParamSem;
    avance: IAvance[];
}

export interface ICaracterisitca
{
    tipo: string;
    dimension: string;
}

export interface ILineaBase
{
    ano: number;
    valor: number;
}

export interface IParamSem
{
    verde: number;
    amarillo: number;
    rojo: number;
}

export interface IAvance
{
    periodo: string;
    valor: number;
}
