import {sanitize, toFloat} from '@rxweb/sanitizers';
import {IInstalacion} from './instalacion/instalacion.interface';
import {notEmpty, numeric, NumericValueType, prop, required} from '@rxweb/reactive-form-validators';
import {IMedicion} from './comun.interface';

@sanitize
export class Instalacion implements IInstalacion
{
    @prop({defaultValue: true})
    activo: boolean;

    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'El valor debe ser numerico'})
    @notEmpty({message: 'El valor no puede ser vacio'})
    @toFloat()
    diamAdeme: number = 0.00;

    @numeric({message: 'El valor debe ser numerico', acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true})
    @notEmpty({message: 'El valor no puede ser vacio'})
    @toFloat()
    diamCol: number = 0.00;

    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Es necesario un valor numerico'})
    @notEmpty({message: 'El valor no puede ser vacio'})
    @toFloat()
    diamPerforacion: number = 0.00;

    @required({message: 'Es necesario colocar una direccion'})
    direccion: string;

    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true, message: 'Es necesario un valor numerico'})
    @notEmpty({message: 'El valor no puede ser vacio'})
    @toFloat()
    longCol: number = 0.00;

    @required({message: 'Es necesario asignar un nombre para la instalacion'})
    nombre: string;

    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true})
    @notEmpty({message: 'El valor no puede ser vacio'})
    @toFloat()
    profPozo: number = 0.00;

    @required({message: 'Es necesario escoger un tipo de instalacion'})
    tipoInstalacion: 'Pozo' | 'Tanque';
    nivelDinamico: IMedicion[] = [];
    nivelEstatico: IMedicion[] = [];
}
