export interface IAuth
{
    activo: boolean;
    usuario: string;
    contrasena: string;
    rol: IRol[];
}

export interface IRol
{
    tipoAcceso: 'ninguno' | 'lectura' | 'completo';
    id: string;
    oculto: boolean;
}
