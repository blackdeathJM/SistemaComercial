export interface ISeleccion
{
    _id: string;
    centroGestor: string[];
    unidad: string[];
    dimension: string[];
    tipo: string[];
    frecuencia: string[]
}

export enum TipoSeleccion
{
    centroGestor = 'centroGestor',
    unidad = 'unidad',
    dimension = 'dimension',
    tipo = 'tipo',
    frecuencia = 'frecuencia'
}
