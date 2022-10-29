import {IModificado, ITelefono, TRegEmpleado} from './empleado.interface';
import {email, prop, propArray, required} from '@rxweb/reactive-form-validators';

export const campoRequerido = 'Este campo es requerido';

export class Empleado implements TRegEmpleado
{
    @required({message: campoRequerido})
    calle: string;
    @required({message: campoRequerido})
    colonia: string;
    @email({message: 'Debe ser un correo valido'})
    correo: string;
    @required({message: campoRequerido})
    deptoId: string;
    @required({message: campoRequerido})
    fechaIngreso: number;
    @required({message: campoRequerido})
    nombreCompleto: string;
    @propArray(undefined, {allowMaxIndex: 3, createBlank: true})
    @required({message: 'Es necesario por lo menos un telefono de contacto'})
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
