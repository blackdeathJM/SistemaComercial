export interface IAuth
{
    activo: boolean;
    usuario: string;
    contrasena: string;
    rol: IRol[];
}

export interface IRol
{
    tipoAcceso: 'N' | 'L' | 'C';
    id: string;
    oculto: boolean;
}
