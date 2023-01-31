export interface IAuth
{
    activo: boolean;
    usuario: string;
    contrasena: string;
    permisos: string[];
    controles: string[];
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
    permisos: string[];
}

export interface ICambioContrasena extends Pick<IAuth, 'contrasena'>
{
    _id: string;
}

export interface IAsigRoles
{
    rol: object[];
}
