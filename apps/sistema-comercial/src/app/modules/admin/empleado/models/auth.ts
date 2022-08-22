import {IAuth, IRol} from '#/libs/models/src';
import {compare, required} from '@rxweb/reactive-form-validators';
import {sanitize, trim} from '@rxweb/sanitizers';

@sanitize
export class Auth implements IAuth
{
    @required({message: 'La contrasena es requerida'})
    contrasena: string;
    @required({message: 'Es requerido la confirmacion de la contrasena'})
    @compare({fieldName: 'contrasena', message: 'Las contrasenas no coinciden'})
    confirmContrasena: string;

    @required({message: 'Es necesario que asignes un usuario'})
    @trim()
    usuario: string;
    rol: IRol[];
    activo: boolean = true;
}
