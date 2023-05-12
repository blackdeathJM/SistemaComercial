import {sanitize, upperCase} from '@rxweb/sanitizers';
import {TRegAvancesPbr, TRegPbr} from './pbr.dto';
import {email, numeric, NumericValueType, prop, required} from '@rxweb/reactive-form-validators';
import {TSumPbr} from './pbrSumatoria.dto';

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
    @email()
    correo: string;

    @prop({defaultValue: false})
    esActualizar: boolean;

    @required()
    tipoOperacion: string;
}

export class AvancesPbr implements TRegAvancesPbr
{
    _id: string;

    idIndicador: string;

    @required()
    tipoOperacion: string;

    esSumatoriaTotal: boolean;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    enero: number;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    febrero: number;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    marzo: number;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    abril: number;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    mayo: number;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    junio: number;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    julio: number;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    agosto: number;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    septiembre: number;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    octubre: number;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    noviembre: number;

    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    diciembre: number;
}

export class RegSumPbr implements TSumPbr
{
    _id: string;

    @required({message: 'El centro gestor es necesario'})
    centroGestor: string;

    @required({message: 'Es necesario que selecciones uno o varios campos que se vayan a sumar'})
    ids: string[];

    @required({message: 'Asigna un nombre a la sumatoria'})
    nombreSumatoria: string;

    @required({message: 'Es necesario que asignes una descripcion'})
    descripcion: string;

    @required({message: 'Este campo es requerido'})
    sumTrim: boolean;

    @required({message: 'Este campo es requerido'})
    sumTotal: boolean;
}
