import {compare, prop, required} from '@rxweb/reactive-form-validators';
import {lowerCase, sanitize} from '@rxweb/sanitizers';
import {IAuth} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';

@sanitize
export class Auth implements IAuth
{
    @required({message: 'La contrasena es requerida'})
    contrasena: string;
    @required({message: 'Es requerido la confirmacion de la contrasena'})
    @compare({fieldName: 'contrasena', message: 'Las contrasenas no coinciden'})
    confirmContrasena: string;

    @required({message: 'Es necesario que asignes un usuario'})
    @lowerCase()
    usuario: string;
    @prop()
    roles: object[] = [];
    activo: boolean;
    estatus: 'En-linea';
    controles: string[] = [];
    guards: string[] = [];
    asigPermisos: string[] = [];
}
