export interface IInstalacion
{
    nombre: string;
    direccion: string;
    profPozo: number;
    diamPerforacion: number;
    diamAdeme: number;
    diamCol: number;
    longCol: number;
    activo: boolean;
    tipoInstalacion: 'Pozo' | 'Tanque';
    niveles: INivel[]
}

export interface INivel
{
    fechaMedicion: Date;
    nivelDinamico: number;
    nivelEstatico: number;
}
