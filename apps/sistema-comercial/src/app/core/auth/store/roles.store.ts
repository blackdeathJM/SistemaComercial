import {StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {IRoles} from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@angular-ru/ngxs/repositories';

@StateRepository()
@State<IRoles>({name: 'roles', defaults: null})
@Injectable()
export class StateRoles extends NgxsDataRepository<IRoles>
{
    @Selector()
    public static roles(state: IRoles): IRoles
    {
        return state;
    }
}
