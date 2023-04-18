import {IPlaneacion} from './planeacion.interface';
import {IMirCuestionario} from './mir/mir.interface';
import {IPbrCuestionario} from './pbr-usuarios/pbr.interface';

export class PlaneacionDto implements IPlaneacion
{
    _id: string;
    ano: number;
    mirCuestionario: IMirCuestionario[];
    pbrCuestionario: IPbrCuestionario[];
}
