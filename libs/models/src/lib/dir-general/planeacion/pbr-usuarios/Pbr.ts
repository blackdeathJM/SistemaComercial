import {sanitize, upperCase} from '@rxweb/sanitizers';
import {TAsigActividad, TRegAvancesPbr, TRegPbr} from './pbr.dto';
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

    esActualizar: boolean;

    @required()
    tipoOperacion: string;
}

export class AvancesPbr implements TRegAvancesPbr
{
    @required({message: 'El campo es requerido'})
    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    enero: number;

    @required({message: 'El campo es requerido'})
    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    febrero: number;

    @required({message: 'El campo es requerido'})
    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    marzo: number;

    @required({message: 'El campo es requerido'})
    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    abril: number;

    @required({message: 'El campo es requerido'})
    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    mayo: number;

    @required({message: 'El campo es requerido'})
    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    junio: number;

    @required({message: 'El campo es requerido'})
    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    julio: number;

    @required({message: 'El campo es requerido'})
    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    agosto: number;

    @required({message: 'El campo es requerido'})
    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    septiembre: number;

    @required({message: 'El campo es requerido'})
    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    octubre: number;

    @required({message: 'El campo es requerido'})
    @numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber})
    noviembre: number;

    @required({message: 'El campo es requerido'})
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

    @prop()
    sumTotal: boolean;
}

export class AsigActividad implements TAsigActividad
{
    @required({message: 'El id es requerido'})
    _id: string;

    @prop()
    idEmpleado: string;

    @required({message: 'Es necesario seleccionar un usuario'})
    idEmpleadoAsig: string;

    @required({message: 'Es necesario seleccionar el elemento a asignar'})
    idsIndicador: string[];
}
