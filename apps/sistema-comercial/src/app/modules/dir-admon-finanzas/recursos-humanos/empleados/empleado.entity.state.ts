import {Computed, DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Injectable} from '@angular/core';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {EmpleadosGQL} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';

@StateRepository()
@State({name: 'empleados', defaults: createEntityCollections<IResolveEmpleado>()})
@Injectable()
export class EmpleadoEntityState extends NgxsDataEntityCollectionsRepository<IResolveEmpleado>
{
    public cargandoDatos = false;

    constructor(private empleadosGQL: EmpleadosGQL)
    {
        super();
    }

    @Computed()
    public get cargando(): boolean
    {
        return this.cargandoDatos;
    }

    @Computed()
    public get longListaEmpleados(): number
    {
        const long;
    }

    @DataAction({subscribeRequired: false})
    public empleados(): void
    {
        this.cargandoDatos = true;
        this.empleadosGQL.watch().valueChanges.pipe().subscribe((listaEmpleados) =>
        {
            if (isNotNil(listaEmpleados.data))
            {
                const lista = $cast<IResolveEmpleado[]>(listaEmpleados.data.empleados);
                this.setAll(lista);
            }
        });
    }
}
