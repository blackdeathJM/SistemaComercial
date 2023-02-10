import {ILectura, IMedidor, IRecibosCfe} from './medidor.interface';

export class MedidorDto implements IMedidor
{
    activo: boolean;
    fechaInstalacion: number;
    fechaRetiro: number;
    lectura: ILectura[];
    medidor: string;
    reciboCfe: IRecibosCfe[];
    servicio: string;
}
