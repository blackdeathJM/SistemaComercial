import { sanitize } from '@rxweb/sanitizers';
import { TRegPbr } from './pbr.dto';

@sanitize
export class Pbr implements TRegPbr
{
    fechaCompleta: string;
    claveVariable: string;
    variableOrigen: string;
    dato: string;
    unidad: string;
    descripcion: string;
    centroGestor: string;
    idEmpleado: string;
    email: string;
    nombreRes: string;
}
