import {IMeses} from '../../../common/common';

export interface ISumatorias extends IMeses
{
    idSumatoria: string;
    centroGestor: string;
    nombreSumatoria: string;
    descripcion: string;
    ids: string[];
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;
    sumTrim: boolean;
    sumTotal: boolean;
    total: number;
}

export interface IPbrCuestionario extends IMeses
{
    idIndicador: string;
    fechaCompleta: string;
    variableOrigen: string;
    dato: string;
    unidad: string;
    descripcion: string;
    centroGestor: string;
    idEmpleado: string;
    correo: string;
    responsable: string;
    //Id del usuario que se le asignara actividad
    asignarActividad: string;
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;
    total: number;
    tipoOperacion: string;
}

export enum TipoOperaciones
{
    suma = 'suma',
    promedio = 'promedio',
    ultimo = 'ultimo',
    unicoValor = 'unicoValor'
}
