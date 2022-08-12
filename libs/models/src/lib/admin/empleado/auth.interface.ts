export interface IAuth
{
    usuario: string;
    contrasena: string;
    correo?: string;
    rol: IRol[];
}

export interface IRol
{
    rol: string;
    tipoAcceso: 'ninguno' | 'lectura' | 'completo';
    departamentoId: string;
}
