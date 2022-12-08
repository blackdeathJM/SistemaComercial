import {INotificacion} from './notificacion.interface';

export class Notificacion implements INotificacion
{
    descripcion: string;
    icono: string;
    idUsuario: string;
    imagen: string;
    leido: boolean;
    link: string;
    tiempo: number;
    titulo: string;
    usarRouter: boolean;
}
