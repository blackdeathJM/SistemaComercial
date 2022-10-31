import {IModificado, ITelefono, TRegEmpleado} from './empleado.interface';
import {email, maxLength, minLength, propArray, required} from '@rxweb/reactive-form-validators';

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
    telefono: Telefono[];

    modificadoPor: IModificado[];
    fechaBaja: number;
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
