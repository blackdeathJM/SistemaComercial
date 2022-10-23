export interface IAuth
{
    activo: boolean;
    usuario: string;
    contrasena: string;
    estatus: 'En-linea' | 'Desconectado' | 'Ocupado' | 'No-visible';
    role: string;
}

export interface IDatosSesion
{
    _id: string;
    avatar: string;
    nombreCompleto: string;
    activo: boolean;
    auth: IAuth;
}
