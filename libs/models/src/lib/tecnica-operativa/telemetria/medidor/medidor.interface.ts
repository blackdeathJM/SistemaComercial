export interface IRecibosCfe
{
    ano: number;
    fecha: Date;
    costoKw: number;
    pago: number;
    lecturaRecibo: number;
    lecturaMedidor: number;
    imgRecibo: string;
}

export interface IMedidor
{
    fechaInstalacion: Date;
    fechaRetiro: Date;
    medidor: string;
    activo: boolean;
    servicio: string;
    reciboCfe: IRecibosCfe[];
}
