export interface IAuth
{
    activo: boolean;
    usuario: string;
    contrasena: string;
    estatus: 'En-linea' | 'Desconectado' | 'Ocupado' | 'No-visible';
    role: IRoles[];
}

export interface IRoles
{
    id: string;
    titulo: string;
    tipoAcceso: string;
    oculto: boolean;
    hijos: IHijosRol[]
}

export interface IHijosRol extends IRoles
{
}

export interface IDatosSesion
{
    _id: string;
    avatar: string;
    nombreCompleto: string;
    activo: boolean;
    auth: IAuth;
}
