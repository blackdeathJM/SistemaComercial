export interface IInstalacion
{
    _id: string;
    nombre: string;
    direccion: string;
    profPozo: number;
    diamPerforacion: number;
    diamAdeme: number;
    diamCol: number;
    longCol: number;
    fechaIFun: number;
    fechaFFun: number;
    activo: boolean;
    bomba: IBomba[];
    motor: IMotor[];
    medidor: IMedidor[];
}

export interface IBomba
{
    id: string;
    modelo: string;
    serie: string;
    marca: string;
    noImpulsores: number;
    rpm: number;
    diametro: number;
    lts: number;
    descripcion: string;
    eficiencia: number;
    fechaInstalacion: number;
    fechaRetiro: number;
    observaciones: string;
    imgEvidenciaInstalacion: string[];
    imgEvidenciaRetiro: string[];
    activa: boolean;
    motivoRet: string;
}

export interface IMotor extends Omit<IBomba, 'noImpulsores' | 'lts' | 'diametro'>
{
    hp: number;
    voltaje: number;
    amperaje: number;
    factPotencia: number;
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
