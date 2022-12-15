import {StateRepository} from '@angular-ru/ngxs/decorators';
import {IEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Injectable} from '@nestjs/common';
import {State} from '@ngxs/store';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';

interface IEmpleadoStore
{
    empleado: IEmpleado[];
    cargando: boolean;
}

@StateRepository()
@State<IEmpleadoStore>({
    name: 'empleados',
    defaults: {cargando: false, empleado: []}
})
@Injectable()
export class StateEmpleados extends NgxsImmutableDataRepository<IEmpleadoStore>
{

}
