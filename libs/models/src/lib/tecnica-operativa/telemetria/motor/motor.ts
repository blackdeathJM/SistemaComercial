import {IMotor} from './motor.interface';
import {notEmpty, numeric, NumericValueType, prop, required} from '@rxweb/reactive-form-validators';
import {sanitize, toFloat, upperCase} from '@rxweb/sanitizers';

@sanitize
export class Motor implements IMotor
{
    @prop()
    activo: boolean = true;

    @notEmpty({message: 'Este campo no puede estar vacio'})
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, message: 'El valor debe ser numerico'})
    @toFloat()
    amperaje: number = 0;

    @prop()
    causasBaja: string = null;

    @prop()
    descripcion: string = null;
    @prop()
    evidenciaInst: string[] = [];
    @prop()
    evidenciaRetiro: string[] = [];

    @notEmpty({message: 'Este campo no puede estar vacio'})
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, message: 'El valor debe ser numerico'})
    @toFloat()
    factPotencia: number = 0;

    @required({message: 'La fecha de instalacion es requerida'})
    fechaInstalacion: Date;

    @prop()
    fechaRetiro: Date = null;

    @notEmpty({message: 'Este campo no puede estar vacio'})
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, message: 'El valor debe ser numerico'})
    @toFloat()
    hp: number = 0;

    @required({message: 'La marca es requerida'})
    marca: string;

    @required({message: 'El modelo es requerido'})
    @upperCase()
    modelo: string;

    @prop()
    motivoRet: string = null;

    @required({message: 'El numero de serie es requerido'})
    @upperCase()
    noSerie: string;

    @prop()
    observaciones: string;

    @notEmpty({message: 'Este campo no puede estar vacio'})
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, message: 'El valor debe ser numerico'})
    @toFloat()
    voltaje: number = 0;

    @notEmpty({message: 'La eficiencia es requerida'})
    @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, message: 'El valor debe ser numerico'})
    @toFloat()
    eficiencia: number = 0;
}
