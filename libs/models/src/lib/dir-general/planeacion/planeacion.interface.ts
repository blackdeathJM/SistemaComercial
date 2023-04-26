import { IPbrCuestionario } from './pbr-usuarios/pbr.interface';
import { IMirCuestionario } from './mir/mir.interface';
import { IEmpleado } from '../../dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';

export enum AscDesc
{
    ascendente = 'Asc',
    descendente = 'Desc'
}

export interface IPlaneacion
{
    _id: string;
    ano: number;
    descripcion: string;
    copia: boolean;
    mirCuestionario: IMirCuestionario[];
    pbrCuestionario: IPbrCuestionario[];
}

export interface IResolvePlaneacion extends IPlaneacion
{
    empleadoPlaneacion: IEmpleado;
}
