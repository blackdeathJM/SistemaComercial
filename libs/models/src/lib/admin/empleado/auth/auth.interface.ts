export interface IAuth
{
    activo: boolean;
    usuario: string;
    contrasena: string;
    role: object[];
    estatus: 'En-linea' | 'Desconectado' | 'Ocupado' | 'No-visible';
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

export interface IRole
{
    rol: string;
}
