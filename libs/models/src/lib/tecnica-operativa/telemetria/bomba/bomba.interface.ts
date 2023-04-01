import {IComunBombaMotor} from '../comun.interface';

export interface IBomba extends IComunBombaMotor
{
    noImpulsores: number;
    rpm: number;
    diametro: number;
    lts: number;
    eficiencia: number;
}
