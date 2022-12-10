export interface INotificacion
{
    _id: string;
    idUsuario: string;
    titulo: string;
    imagen: string;
    icono: string;
    descripcion: string;
    tiempo: number;
    link: string;
    leido: boolean;
    usarRouter: boolean;
}
