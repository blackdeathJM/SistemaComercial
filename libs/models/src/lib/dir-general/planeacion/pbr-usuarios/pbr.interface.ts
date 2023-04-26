import {IMeses} from '../../../common/common';

export interface IPbrCuestionario extends IMeses
{
    id: string;
    fechaCompleta: string;
    claveVariable: string;
    variableOrigen: string;
    dato: string;
    unidad: string;
    descripcion: string;
    centroGestor: string;
    idEmpleado: string;
    correo: string;
    nombreRes: string;
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;
    calculoTrim: string;
    total: number;
    calculoTotal: string;
}
