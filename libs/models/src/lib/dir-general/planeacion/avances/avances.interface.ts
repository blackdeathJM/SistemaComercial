export interface IAvances
{
    ano: number;
    encabezado: string;
    definicion: string;
    fechaLarga: string;
    centroGestor: string;
    elaboro: string;
    aEdoFecha: string;
    metodoCaculo: string;
    avance: IAvance[]
}

export interface IAvance
{
    concepto: string;
    valor: number;
    total: number;
    valorTrimestre: number;
}
