export interface IComunBombaMotor
{
    noSerie: string;
    modelo: string;
    fechaInstalacion: Date;
    fechaRetiro: Date;
    evidenciaInst: string[];
    evidenciaRetiro: string[];
    marca: string;
    motivoRet: string;
    observaciones: string;
    descripcion: string;
    activo: boolean;
}

export interface IMedicion
{
    ano: number;
    enero: number;
    febrero: number;
    marzo: number;
    abril: number;
    mayo: number;
    junio: number;
    julio: number;
    agosto: number;
    septiembre: number;
    octubre: number;
    noviembre: number;
    diciembre: number;
}
