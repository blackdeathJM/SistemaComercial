import {Computed, DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsOnChanges, Selector, State} from '@ngxs/store';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Injectable} from '@angular/core';
import {createEntityCollections, EntityCollections, EntityIdType} from '@angular-ru/cdk/entity';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {EmpleadosGQL, EmpleadosSesionGQL} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {finalize} from 'rxjs';

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
    public cargandoDatos = false;
    public primaryKey = '_id';

    constructor(private empleadosGQL: EmpleadosGQL, private empleadosSesionGQL: EmpleadosSesionGQL)
    {
        super();
    }

    @Computed()
    public get cargando(): boolean
    {
        return this.cargandoDatos;
    }

    @Computed()
    public get longListaEmpleados(): boolean
    {
        return this.entitiesArray.length === 0;
    }

    @Selector()
    public static empleado(stateEmpleado: EntityCollections<IResolveEmpleado, EntityIdType, IEmpleadoSelect>): IResolveEmpleado
    {
        return stateEmpleado.empleado;
    }

    @DataAction()
    public seleccionarEmpleado(@Payload('empleadoSeleccionado') _id: string): void
    {
        const state = this.getState();
        const empleado = this.selectOne(_id);
        this.setEntitiesState({
            ...state,
            empleado
        });
    }

    @DataAction()
    public empleados(): void
    {
        this.cargandoDatos = true;
        this.empleadosGQL.watch().valueChanges.pipe(finalize(() => console.log('empleados no entra finalize'))).subscribe((listaEmpleados) =>
        {
            if (isNotNil(listaEmpleados.data))
            {
                const lista = $cast<IResolveEmpleado[]>(listaEmpleados.data.empleados);
                this.setAll(lista);
            }
            this.cargandoDatos = false;
        });
    }

    @DataAction()
    public empleadosConSesion(): void
    {
        this.cargandoDatos = true;
        this.empleadosSesionGQL.watch().valueChanges.subscribe((empleadosSesion) =>
        {
            if (isNotNil(empleadosSesion.data.empleadosSesion))
            {
                const empleados = $cast<IResolveEmpleado[]>(empleadosSesion.data.empleadosSesion);
                this.setAll(empleados);
            }
            this.cargandoDatos = false;
        });
    }
}
