import {StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsOnInit, Selector, State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';

@StateRepository()
@State<IDatosSesion>({
    name: 'auth',
    defaults: null
})
@Injectable()
export class StateAuth extends NgxsImmutableDataRepository<IDatosSesion> implements NgxsOnInit
{
    constructor()
    {
        super();
    }

    @Selector()
    public static sesionActual(state: IDatosSesion): IDatosSesion
    {
        return state;
    }
}
