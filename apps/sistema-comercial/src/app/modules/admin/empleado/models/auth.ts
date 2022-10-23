import {compare, required} from '@rxweb/reactive-form-validators';
import {sanitize, trim} from '@rxweb/sanitizers';
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
    @trim()
    usuario: string;
    role: string;
    activo: boolean;
    estatus: 'En-linea' | 'Desconectado' | 'Ocupado' | 'No-visible';
}
