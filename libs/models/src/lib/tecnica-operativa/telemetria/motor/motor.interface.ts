import {IComunBombaMotor} from '../comun.interface';

export interface IMotor extends IComunBombaMotor
{
    hp: number;
    voltaje: number;
    amperaje: number;
    factPotencia: number;
    eficiencia: number;
}
