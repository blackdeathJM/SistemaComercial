export interface ILectura
{
    mes: string;
    lectura: number;
}

export interface IRecibosCfe
{
    fecha: number;
    costoKw: number;
    pago: number;
    lectura: number;
    imgRecibo: string;
}
export interface IMedidor
{
    fechaInstalacion: number;
    fechaRetiro: number;
    medidor: string;
    activo: boolean;
    servicio: string;
    lectura: ILectura[];
    reciboCfe: IRecibosCfe[];
}
