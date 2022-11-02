export interface IModificado
{
    usuario: string;
    fecha: number;
    accion: string;
    valorAnterior: object[];
    valorActual: object[];
}

export interface IPaginacion
{
    offset: number;
    limit: number;
}
