import {IPbrCuestionario} from './pbr-usuarios/pbr.interface';
import {IMirCuestionario} from './mir/mir.interface';

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
    mirCuestionario: IMirCuestionario[];
    pbrCuestionario: IPbrCuestionario[];
}