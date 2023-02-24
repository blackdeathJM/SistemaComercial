import {IModificado} from './common.interface';

export class Modificado implements IModificado
{
    accion: string;
    fecha: number;
    usuario: string;
    valorActual: object[];
    valorAnterior: object[];
}

export interface IMeses
{
    ano: number;
    enero: number;
    febrero: number;
    marzo: number;
    abril: number;
    mayo: number;
    junio: number;
    julio: number;
    agosto: number;
    septiembre: number;
    octubre: number;
    noviembre: number;
    diciembre: number;
}
