export interface IDepto
{
    _id?: string;
    nombre: string;
    centroGestor: string;
    puestos?: string[];
}

export interface IRegPuesto extends Pick<IDepto, '_id'>
{
    puesto: string;
}
