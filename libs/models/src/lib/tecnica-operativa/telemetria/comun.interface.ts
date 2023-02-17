export interface IComunBombaMotor
{
    id: number;
    noSerie: string;
    modelo: string;
    fechaInstalacion: Date;
    fechaRetiro: Date;
    evidenciaInst: string[];
    evidenciaRetiro: string[];
    marca: string;
    motivoRet: string;
    observaciones: string;
    activo: boolean;
}
