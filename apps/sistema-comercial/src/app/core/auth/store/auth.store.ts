import { Store, StoreConfig } from '@datorama/akita';
import { IDatosSesion } from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sesionUsuario', idKey: '_id' })
export class AuthStore extends Store<IDatosSesion>
{
    constructor()
    {
        super({} as IDatosSesion);
    }
}
