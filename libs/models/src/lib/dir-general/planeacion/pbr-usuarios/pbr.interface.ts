import { IMeses } from '../../../common/common';
import { IEmpleado } from '../../../dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';

export interface IPbrCuestionario
{
    centroGestor: string;
    cuestionario: IPbr[];
}

export interface IPbr extends IMeses
{
    id: string;
    claveVariable: string;
    variableOrigen: string;
    dato: string;
    unidad: string;
    descripcion: string;
    centroGestor: string;
    idEmpleado: string;
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;
    total: number;
}
