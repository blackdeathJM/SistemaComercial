export interface IAuth
{
    _id?: string;
    usuario: string;
    contrasena: string;
    correo?: string;
    rol: IRol[];
}

export interface IRol
{
    tipoAcceso: 'ninguno' | 'lectura' | 'completo';
    departamentoId: string;
}
