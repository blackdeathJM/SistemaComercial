import {sanitize, toFloat} from '@rxweb/sanitizers';
import {IInstalacion} from './instalacion/instalacion.interface';
import {greaterThan, numeric, NumericValueType, prop, required} from '@rxweb/reactive-form-validators';

@sanitize
export class Instalacion implements IInstalacion
{
    @prop({defaultValue: true})
    activo: boolean;
    @toFloat()
    @required({message: 'Es requerido'})
    diamAdeme: number = 0;
    @greaterThan({message: 'El valor deb ser mayor a cero si es un pozo', conditionalExpression: x => x.tipoInstalacion === 'Pozo', value: 0})
    @numeric({message: 'El valor debe ser numerico', acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, persistZero: true})
    diamCol: number = 0;
    @required({message: 'Si la instalacion es pozo es necesario colocar este dato', conditionalExpression: x => x.tipoInstalacion === 'Pozo'})
    diamPerforacion: number = 0;
    @required({message: 'Es necesario colocar una direccion'})
    direccion: string;
    @required({message: 'Si la instalacion es pozo es necesario colocar este dato', conditionalExpression: x => x.tipoInstalacion === 'Pozo'})
    longCol: number = 0;
    @required({message: 'El nombre de la instalacion es requerido'})
    nombre: string;
    @required({message: 'Si la instalacion es pozo es necesario colocar este dato', conditionalExpression: x => x.tipoInstalacion === 'Pozo'})
    profPozo: number = 0;
    @required({message: 'Selecciona el tipo de instalacion que es'})
    tipoInstalacion: 'Pozo' | 'Tanque';
}
