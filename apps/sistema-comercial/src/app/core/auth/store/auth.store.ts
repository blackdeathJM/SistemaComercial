import {Store, StoreConfig} from '@datorama/akita';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {Injectable} from '@angular/core';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
// export function createInitialState(): IDatosSesion
// {
//     return null;
// }

export const inicializar = (): IDatosSesion => null;

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'sesionUsuario', idKey: '_id'})
export class AuthStore extends Store<IDatosSesion>
{
    constructor()
    {
        super(inicializar());
    }
}
