import {IModificado, TRegEmpleado} from './empleado.interface';
import {prop, required} from '@rxweb/reactive-form-validators';

export class Empleado implements TRegEmpleado
{
    activo: boolean;
    avatar: string;
    @required()
    calle: string;
    @required()
    colonia: string;
    @prop()
    correo: string;
    @required()
    deptoId: string;
    fechaBaja: number;
    @required()
    fechaIngreso: number;
    modificadoPor: IModificado[];
    @required()
    nombreCompleto: string;
    @prop()
    telefono: string[];
}

