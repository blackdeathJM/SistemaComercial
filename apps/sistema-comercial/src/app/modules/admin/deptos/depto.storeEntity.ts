import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {createEntityCollections, EntityIdType} from '@angular-ru/cdk/entity';
import {Injectable} from '@angular/core';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {DepartamentosGQL} from '#/libs/datos/src';
import {isNotNil} from "@angular-ru/cdk/utils";

@StateRepository()
@State({
    name: 'deptos',
    defaults: createEntityCollections()
})
@Injectable()
export class DeptoEntitieState extends NgxsDataEntityCollectionsRepository<IDepto>
{
    constructor(private departamentosGQL: DepartamentosGQL)
    {
        super();
    }

    @Selector()
    public static deptos(state: IDepto[]): IDepto[]
    {
        return state;
    }

    @DataAction({subscribeRequired: false})
    public cargarDeptos(): void
    {
        this.departamentosGQL.watch().valueChanges.subscribe((res) =>
        {
            if (isNotNil(res.data))
            {

            }
        });
    }

    public selectId(entity: IDepto): EntityIdType
    {
        return entity._id;
    }

    // @Computed()
    // public get cargando(): boolean
    // {
    //     return this.snapshot.cargando;
    // }
}
