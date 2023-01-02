import {StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Injectable} from '@angular/core';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';

@StateRepository()
@State({name: 'empleados', defaults: createEntityCollections<IResolveEmpleado>()})
@Injectable()
export class EmpleadoEntityState extends NgxsDataEntityCollectionsRepository<IResolveEmpleado>
{
}
