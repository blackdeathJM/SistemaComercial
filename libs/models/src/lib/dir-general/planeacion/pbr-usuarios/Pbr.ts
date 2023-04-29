import {sanitize, upperCase} from '@rxweb/sanitizers';
import {TRegPbr} from './pbr.dto';
import {prop, required} from '@rxweb/reactive-form-validators';

@sanitize
export class Pbr implements TRegPbr
{
    _id: string;

    @upperCase()
    @required()
    idIndicador: string;

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

    @prop()
    responsable: string;

    @required()
    correo: string;

    @prop({defaultValue: false})
    esActualizar: boolean;

    @required()
    esSumatoriaTrim: boolean

    @required()
    esSumatoriaTotal: boolean;
}
