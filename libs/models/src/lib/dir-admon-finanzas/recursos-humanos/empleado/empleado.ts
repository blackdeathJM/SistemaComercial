import {ITelefono, TRegEmpleado} from './empleado.interface';
import {email, maxLength, minLength, propArray, required} from '@rxweb/reactive-form-validators';
import {lowerCase, sanitize} from '@rxweb/sanitizers';
import {Modificado} from '../../../common/common';

export const campoRequerido = 'Este campo es requerido';

@sanitize
export class Empleado implements TRegEmpleado
{
    @required({message: campoRequerido})
    calle: string;
    @required({message: campoRequerido})
    colonia: string;
    @email({message: 'Debe ser un correo valido'})
    @lowerCase()
    correo: string;
    @required({message: campoRequerido})
    deptoId: string;
    @required({message: campoRequerido})
    fechaIngreso: number;
    @required({message: campoRequerido})
    nombreCompleto: string;
    @propArray(undefined, {allowMaxIndex: 3, createBlank: true})
    telefono: Telefono[];
    modificadoPor: Modificado[];
    activo: boolean;
    avatar: string;
}


export class Telefono implements ITelefono
{
    @required({message: campoRequerido})
    @maxLength({value: 10, message: 'La longitud maxima es de 10 numeros'})
    @minLength({value: 10, message: 'La longitud minima es de 10 numeros'})
    numero: string;
}
