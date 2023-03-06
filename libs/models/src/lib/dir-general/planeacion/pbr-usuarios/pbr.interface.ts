import {IMeses} from '../../../common/common';

export interface IPbr
{
    ano: number;
    _id?: string;
    claveVariable: string;
    dato: string;
    unidad: string;
    descripcion: string
    ejercicio: IEjercicio;
}

export interface IEjercicio extends IMeses
{
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;
    total: number;
}
