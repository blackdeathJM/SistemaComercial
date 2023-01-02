import {Computed, DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Injectable} from '@angular/core';
import {createEntityCollections, EntityIdType} from '@angular-ru/cdk/entity';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {EmpleadosGQL, EmpleadosSesionGQL} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {finalize} from 'rxjs';

interface IEmpleadoSelect
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
export class EntityEmpleadoStore extends NgxsDataEntityCollectionsRepository<IResolveEmpleado, EntityIdType, IEmpleadoSelect>
{
    public cargandoDatos = false;

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
        return this.entitiesArray.length > 0;
    }

    @Computed()
    public get obtenerEmpleado(): IResolveEmpleado
    {
        return this.snapshot.empleado;
    }

    @DataAction()
    public seleccionarEmpleado(@Payload('empleadoSeleccionado') empleado: IResolveEmpleado): void
    {
        const state = this.getState();
        this.setEntitiesState({
            ...state,
            empleado
        });
    }

    @DataAction({subscribeRequired: false})
    public empleados(): void
    {
        this.cargandoDatos = true;
        this.empleadosGQL.watch().valueChanges.pipe(finalize(() => this.cargandoDatos = false)).subscribe((listaEmpleados) =>
        {
            if (isNotNil(listaEmpleados.data))
            {
                const lista = $cast<IResolveEmpleado[]>(listaEmpleados.data.empleados);
                this.setAll(lista);
            }
        });
    }

    @DataAction({subscribeRequired: false})
    public empleadosConSesion(): void
    {
        this.cargandoDatos = true;
        this.empleadosSesionGQL.watch().valueChanges.pipe(finalize(() => this.cargandoDatos = false)).subscribe((empleadosSesion) =>
        {
            if (isNotNil(empleadosSesion.data.empleadosSesion))
            {
                const empleados = $cast<IResolveEmpleado[]>(empleadosSesion.data.empleadosSesion);
                this.setAll(empleados);
            }
        });
    }
}
