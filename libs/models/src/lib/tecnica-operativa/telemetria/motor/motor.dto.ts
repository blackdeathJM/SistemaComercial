import {IMotor} from './motor.interface';

export class MotorDto implements IMotor
{
    activo: boolean;
    amperaje: number;
    evidenciaInst: string[];
    evidenciaRetiro: string[];
    factPotencia: number;
    fechaInstalacion: number;
    fechaRetiro: number;
    hp: number;
    id: string;
    marca: string;
    model: string;
    motivoRet: string;
    noSerie: string;
    observaciones: string;
    voltaje: number;
}
