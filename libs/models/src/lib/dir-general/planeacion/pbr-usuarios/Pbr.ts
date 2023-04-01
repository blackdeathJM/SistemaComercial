import {TRegPbr} from './pbr-consultas.dto';
import {maxNumber, minNumber, numeric, NumericValueType, prop, required} from '@rxweb/reactive-form-validators';
import {sanitize, upperCase} from '@rxweb/sanitizers';

@sanitize
export class Pbr implements TRegPbr
{
    @numeric({message: 'El valor debe ser numerico', allowDecimal: false, acceptValue: NumericValueType.PositiveNumber, persistZero: false})
    @maxNumber({message: 'El valor maximo es 2050', value: 2050})
    @minNumber({message: 'El valor minimo es 2020', value: 2020})
    @prop({defaultValue: new Date().getFullYear()})
    ano: number;

    @required({message: 'Este campo es requerido'})
    @upperCase()
    claveVariable: string;

    @required({message: 'Este campo es requerido'})
    @upperCase()
    variableOrigen: string;

    @required({message: 'Este campo es requerido'})
    dato: string;

    @required({message: 'Este campo es requerido'})
    descripcion: string;

    @required({message: 'Este campo es requerido'})
    unidad: string;

    @required({message: 'Este campo es requerido'})
    centroGestor: string;

    @required({message: 'Es necesario que selecciones un usuario'})
    idEmpleado: string;
}
