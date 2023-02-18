import {IMedicion} from '../comun.interface';

export interface IInstalacion
{
    nombre: string;
    direccion: string;
    profPozo: number;
    diamPerforacion: number;
    diamAdeme: number;
    diamCol: number;
    longCol: number;
    activo: boolean;
    tipoInstalacion: 'Pozo' | 'Tanque';
    nivelDinamico: IMedicion[];
    nivelEstatico: IMedicion[];
}

export interface ITomarMedicion extends Partial<IMedicion>
{
    _id: string;
    esDinamico: boolean;
}
