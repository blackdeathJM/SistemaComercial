import { Store, StoreConfig } from '@datorama/akita';
import { IRoles } from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';
import { Injectable } from '@angular/core';

// export interface IRolesState extends EntityState<IRoles, string>, ActiveState
// {
// }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Roles', idKey: '_id' })
export class RolesStore extends Store<IRoles>
{
    constructor()
    {
        super({} as IRoles);
    }
}
