import {sanitize, upperCase} from '@rxweb/sanitizers';
import {TRegPbr} from './pbr.dto';
import {prop, required} from "@rxweb/reactive-form-validators";

@sanitize
export class Pbr implements TRegPbr
{
    @upperCase()
    @required()
    claveVariable: string;

    @upperCase()
    @required()
    variableOrigen: string;

    @required()
    dato: string;

    @required()
    unidad: string;

    @required()
    descripcion: string;

    @required()
    centroGestor: string;

    @required()
    idEmpleado: string;

    @required()
    correo: string;

    @prop()
    nombreRes: string;
}
