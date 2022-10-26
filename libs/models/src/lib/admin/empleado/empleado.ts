import {IModificado, ITelefono, TRegEmpleado} from './empleado.interface';
import {email, prop, propArray, required} from '@rxweb/reactive-form-validators';

export class Empleado implements TRegEmpleado
{
    @required()
    calle: string;
    @required()
    colonia: string;
    @email({message: 'Debe ser un correo valido'})
    correo: string;
    @required()
    deptoId: string;
    @required()
    fechaIngreso: number;
    @required()
    nombreCompleto: string;
    @propArray()
    telefono: ITelefono[];

    modificadoPor: IModificado[];
    fechaBaja: number;
    activo: boolean;
    avatar: string;
}

export class Telefono implements ITelefono
{
    @prop()
    numero: string;
}
