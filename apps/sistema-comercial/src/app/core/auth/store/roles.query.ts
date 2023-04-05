import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {RolesStore} from '@s-core/auth/store/roles.store';
import {IRoles} from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';

@Injectable({providedIn: 'root'})
export class RolesQuery extends Query<IRoles>
{
    constructor(protected rolesStore: RolesStore)
    {
        super(rolesStore);
    }
}
