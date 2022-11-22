import {INotificacion} from './notificacion.interface';

export class NotificacionDto implements INotificacion
{
    descripcion: string;
    icono: string;
    id: string;
    imagen: string;
    leido: boolean;
    link: string;
    tiempo: string;
    titulo: string;
    usarRouter: boolean;
}