import {maxLength, minLength, required} from '@rxweb/reactive-form-validators';
import {sanitize, upperCase} from '@rxweb/sanitizers';


@sanitize
export class DeptoModel implements IDepto
{


    @required({message: 'El nombre del departamento es requerido'})
    nombre: string;

    @required({message: 'El centro gestor es requerido'})
    @minLength({value: 3, message: 'La longitud minima es de 3 caracteres'})
    @maxLength({value: 3, message: 'La longitud maxima es de 3 caracteres'})
    @upperCase()
    centroGestor: string;

    _id?: string;
}

export interface IDepto
{
    _id?: string;
    nombre: string;
    centroGestor: string;
}
