import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Injectable} from '@angular/core';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';

@StateRepository()
@State<IResolveEmpleado>({
    name: 'empleado',
    defaults: null,
})
@Injectable()
export class StateEmpleado extends NgxsImmutableDataRepository<IResolveEmpleado>
{
    constructor()
    {
        super();
    }

    @Selector()
    public empleadoSeleccinado(state: IResolveEmpleado): IResolveEmpleado
    {
        return state;
    }

    @DataAction({subscribeRequired: false})
    selecEmpleado(empleado: IResolveEmpleado): void
    {
        this.setState(empleado);
    }
}
