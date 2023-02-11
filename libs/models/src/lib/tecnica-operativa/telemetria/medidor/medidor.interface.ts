export enum Meses
{
    Enero = 'Enero',
    Febrero = 'Febrero',
    Marzo = 'Marzo',
    Abril = 'Abril',
    Mayo = 'Mayo',
    Junio = 'Junio',
    Julio = 'Julio',
    Agosto = 'Agosto',
    Septiembre = 'Septiembre',
    Octubre = 'Octubre',
    Noviembre = 'Noviembre',
    Diciembre = 'Diciembre'
}

export interface ILectura
{
    mes: Meses;
    lectura: number;
}

export interface IRecibosCfe
{
    fecha: Date;
    costoKw: number;
    pago: number;
    lectura: number;
    imgRecibo: string;
}

export interface IMedidor
{
    fechaInstalacion: Date;
    fechaRetiro: Date;
    medidor: string;
    activo: boolean;
    servicio: string;
    lectura: ILectura[];
    reciboCfe: IRecibosCfe[];
}
