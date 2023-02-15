import {IInstalacion} from './instalacion/instalacion.interface';
import {IBomba} from './bomba/bomba.interface';
import {IMotor} from './motor/motor.interface';
import {IMedidor} from './medidor/medidor.interface';

export interface ITelemetria
{
    _id: string;
    instalacion: IInstalacion;
    bombas: IBomba[];
    motores: IMotor[];
    medidores: IMedidor[];
}

export type TRegInstalacion = Pick<ITelemetria, 'instalacion'>;
