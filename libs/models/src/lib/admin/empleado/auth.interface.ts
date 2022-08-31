export interface IAuth
{
    activo: boolean;
    usuario: string;
    contrasena: string;
    estatus: 'En-linea' | 'Desconectado'| 'Ocupado'| 'No-visible';
    rol: IRol[];
}

export interface IRol
{
    tipoAcceso: 'ninguno' | 'lectura' | 'completo';
    id: string;
    oculto: boolean;
}

export interface IDatosSesion
{
    _id: string;
    avatar: string;
    nombreCompleto: string;
    activo: boolean;
    auth: IAuth;
}
