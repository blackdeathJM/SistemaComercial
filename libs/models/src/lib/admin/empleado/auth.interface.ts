export type tipoAcceso = 'ninguno' | 'lectura' | 'completo';

export interface IAuth
{
    activo: boolean;
    usuario: string;
    contrasena: string;
    rol: IRol[];
}

export interface IRol
{
    tipoAcceso: tipoAcceso;
    id: string;
    oculto: boolean;
}
