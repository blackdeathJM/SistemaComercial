export interface IAuth
{
    activo: boolean;
    usuario: string;
    contrasena: string;
    estatus: 'En-linea' | 'Desconectado' | 'Ocupado' | 'No-visible';
    role: object[];
}

export interface IDatosSesion
{
    _id: string;
    avatar: string;
    nombreCompleto: string;
    activo: boolean;
    deptoId: string;
    auth: IAuth;
}

export interface ICambioContrasena extends Pick<IAuth, 'contrasena'>
{
    _id: string;
}
