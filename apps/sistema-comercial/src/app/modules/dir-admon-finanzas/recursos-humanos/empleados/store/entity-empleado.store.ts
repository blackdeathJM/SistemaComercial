import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsOnChanges, Selector, State} from '@ngxs/store';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Injectable} from '@angular/core';
import {createEntityCollections, EntityCollections, EntityIdType} from '@angular-ru/cdk/entity';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {EmpleadosGQL, EmpleadosSesionGQL} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';

export interface IEmpleadoSelect
{
    empleado: IResolveEmpleado;
}

@StateRepository()
@State({
    name: 'empleados', defaults: {
        ...createEntityCollections(),
        empleado: null
    }
})
@Injectable()
export class EntityEmpleadoStore extends NgxsDataEntityCollectionsRepository<IResolveEmpleado, EntityIdType, IEmpleadoSelect> implements NgxsOnChanges
{
    public primaryKey = '_id';

    constructor(private empleadosGQL: EmpleadosGQL, private empleadosSesionGQL: EmpleadosSesionGQL)
    {
        super();
    }

    @Selector()
    public static empleado(stateEmpleado: EntityCollections<IResolveEmpleado, EntityIdType, IEmpleadoSelect>): IResolveEmpleado
    {
        return stateEmpleado.empleado;
    }

    @DataAction()
    public seleccionarEmpleado(@Payload('empleadoSeleccionado') empleado: IResolveEmpleado): void
    {
        // const state = this.getState();
        // const empleado = this.selectOne(_id);
        // this.setEntitiesState({
        //     ...state,
        //     empleado
        // });
        const empleadoSeleccionado = this.selectOne(empleado._id);
        this.ctx.patchState({empleado: empleadoSeleccionado});
    }

    @DataAction()
    public empleadosConSesion(): void
    {
        this.empleadosSesionGQL.watch().valueChanges.subscribe((empleadosSesion) =>
        {
            if (isNotNil(empleadosSesion.data.empleadosSesion))
            {
                const empleados = $cast<IResolveEmpleado[]>(empleadosSesion.data.empleadosSesion);
                this.setAll(empleados);
            }
        });
    }
}
