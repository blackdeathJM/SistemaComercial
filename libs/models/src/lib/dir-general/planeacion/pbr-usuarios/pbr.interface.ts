import {IMeses} from '../../../common/common';
import {IEmpleado} from '../../../dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';

export interface IPbr
{
    _id?: string;
    claveVariable: string;
    variableOrigen: string;
    dato: string;
    unidad: string;
    descripcion: string
    centroGestor: string;
    idEmpleado: string;
    ejercicio: IEjercicio;
}

export interface IEjercicio extends IMeses
{
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;
    total: number;
    forEnero: string;
    forFebrero: string;
    forMarzo: string;
    forAbril: string;
    forMayo: string;
    forJunio: string;
    forJulio: string;
    forAgosto: string;
    forSeptiembre: string;
    forOctubre: string;
    forNoviembre: string;
    forDiciembre: string;
}

export interface IResPbrEmpleado extends IPbr
{
    resPbrEmpleado: IEmpleado;
}
