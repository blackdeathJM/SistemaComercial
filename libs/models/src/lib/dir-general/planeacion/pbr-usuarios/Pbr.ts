import {IEjercicio, IPbr} from './pbr.interface';

export class Pbr implements IPbr
{
    ano: number;
    claveVariable: string;
    dato: string;
    descripcion: string;
    ejercicio: IEjercicio;
    unidad: string;
}
