import {IMeses} from '../../../common/common';

export interface ISumatorias
{
    idIndicador: string;
    nombreSumatoria: string;
    descripcion: string;
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
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;
    total: number;

    esSumatoriaTrim: boolean;
    esSumatoriaTotal: boolean;
}
