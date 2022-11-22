import {IBomba, IInstalacion, ILectura, IMedidor, IMotor, IRecibosCfe} from './instalacion.interface';
import {OmitType} from '@nestjs/graphql';

export class InstalacionDto implements IInstalacion
{
    _id: string;
    activo: boolean;
    bomba: BombaDto[];
    diamAdeme: number;
    diamCol: number;
    diamPerforacion: number;
    direccion: string;
    fechaFFun: number;
    fechaIFun: number;
    longCol: number;
    medidor: MedidorDto[];
    motor: MotorDto[];
    nombre: string;
    profPozo: number;

}

export class BombaDto implements IBomba
{
    activa: boolean;
    descripcion: string;
    diametro: number;
    eficiencia: number;
    fechaInstalacion: number;
    fechaRetiro: number;
    id: string;
    imgEvidenciaInstalacion: string[];
    imgEvidenciaRetiro: string[];
    lts: number;
    marca: string;
    modelo: string;
    motivoRet: string;
    noImpulsores: number;
    observaciones: string;
    rpm: number;
    serie: string;
}

export class MotorDto extends BombaDto implements IMotor
{
    amperaje: number;
    factPotencia: number;
    hp: number;
    voltaje: number;
}

export class MedidorDto implements IMedidor
{
    activo: boolean;
    fechaInstalacion: number;
    fechaRetiro: number;
    lectura: LecturaDto[];
    medidor: string;
    reciboCfe: RecibosCfeDto[];
    servicio: string;
}

export class LecturaDto implements ILectura
{
    lectura: number;
    mes: string;
}

export class RecibosCfeDto implements IRecibosCfe
{
    costoKw: number;
    fecha: number;
    imgRecibo: string;
    lectura: number;
    pago: number;
}
