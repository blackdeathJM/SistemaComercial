import { sanitize, upperCase } from '@rxweb/sanitizers';
import { TRegPbr } from './pbr.dto';
import { prop, required } from '@rxweb/reactive-form-validators';
import { DateTime } from 'luxon';

@sanitize
export class Pbr implements TRegPbr
{
    @prop({ defaultValue: null })
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

    @required()
    correo: string;

    @prop()
    responsable: string;

    @prop({ defaultValue: false })
    esActualizar: boolean;

    @required()
    esSumatoria: boolean;

    @required()
    esSumatoriaTotal: boolean;
}
