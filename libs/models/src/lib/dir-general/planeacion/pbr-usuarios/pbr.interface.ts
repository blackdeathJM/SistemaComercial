import {IMeses} from '../../../common/common';

export interface IPbr
{
    ano: number;
    _id: string;
    claveVariable: string;
    dato: string;
    unidad: string;
    descripcion: string
    ejercicion: IEjercicio;
}

export interface IEjercicio extends IMeses
{
    ejercicio: number;
    trimestre: ITrimestre[];
}

export interface ITrimestre
{
    trimestre: string;
    valor: number;
}
