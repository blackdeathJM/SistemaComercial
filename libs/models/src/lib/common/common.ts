import {IModificado} from './common.interface';

export class Modificado implements IModificado
{
    accion: string;
    fecha: number;
    usuario: string;
    valorActual: object[];
    valorAnterior: object[];
}
