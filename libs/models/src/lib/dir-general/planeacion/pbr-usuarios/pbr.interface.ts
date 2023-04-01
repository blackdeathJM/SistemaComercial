import {IMeses} from '../../../common/common';
import {IEmpleado} from '../../../dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';

export interface IPbr extends IMeses
{
    _id?: string;
    claveVariable: string;
    variableOrigen: string;
    dato: string;
    unidad: string;
    descripcion: string
    centroGestor: string;
    idEmpleado: string;
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

export interface IPbrUsuario
{
    _id: string;
    ano: number;
    pbr: IPbr;
    tTomas: number;
    forTTomas: string;
    tTomasDescargaSan: number;
    forTomasDescargaSan: string;
}


export interface IResPbrEmpleado extends IPbr
{
    resPbrEmpleado: IEmpleado;
}
