import {IMeses} from '../../common/common';

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

export interface IMedicion extends IMeses
{
    ano: number;
}
