import {IMeses} from '../../../common/common';

export interface IPbrCuestionario extends IMeses
{
    idIndicador: string;
    fechaCompleta: string;
    claveVariable: string;
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
    esSumatoria: boolean;
    camposCalculo: string[];
    formulaCalculo: string;
    total: number;
    esSumatoriaTotal: boolean;
    camposCalculoTotal: string[];
    formulaTotal: string;
}
