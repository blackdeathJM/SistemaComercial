import {Computed, DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {createEntityCollections, EntityIdType} from '@angular-ru/cdk/entity';
import {Injectable} from '@angular/core';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {DepartamentosGQL} from "#/libs/datos/src";
import {$cast} from "@angular-ru/cdk/utils";

interface IDeptoCargando
{
    cargando: boolean;
}

@StateRepository()
@State({
    name: 'deptos',
    defaults: {
        ...createEntityCollections(),
        cargando: false
    }
})
@Injectable()
export class DeptoEntitieState extends NgxsDataEntityCollectionsRepository<IDepto, EntityIdType, IDeptoCargando>
{
    constructor(private departamentosGQL: DepartamentosGQL)
    {
        super();
    }

    @Computed()
    public get cargando(): boolean
    {
        return this.snapshot.cargando;
    }

    @Selector()
    public static deptos(state: IDepto[]): IDepto[]
    {
        return state;
    }

    @DataAction({subscribeRequired: false})
    public cargarDeptos(): void
    {
        this.departamentosGQL.watch().valueChanges.subscribe((deptos) =>
        {
            const cargaDeptos = $cast<IDepto[]>(deptos.data.deptos);
            this.ctx.setState({entities: cargaDeptos, cargando: false, ids:})
        });
    }

    @DataAction()
    public setCargando(@Payload('cargando') cargando: boolean): void
    {
        const state = this.getState();
        this.setEntitiesState({...state, cargando});

    }

}
