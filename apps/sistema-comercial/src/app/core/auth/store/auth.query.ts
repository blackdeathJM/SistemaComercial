import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {AuthStore} from '@s-core/auth/store/auth.store';

@Injectable({providedIn: 'root'})
export class AuthQuery extends Query<IDatosSesion>
{
    constructor(protected authStore: AuthStore)
    {
        super(authStore);
    }
}
