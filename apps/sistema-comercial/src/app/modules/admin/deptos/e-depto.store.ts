import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {createEntityCollections, EntityIdType} from '@angular-ru/cdk/entity';
import {Injectable} from '@angular/core';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {DepartamentosGQL} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';

@StateRepository()
@State({
    name: 'deptos',
    defaults: createEntityCollections()
})
@Injectable()
export class EDeptoStore extends NgxsDataEntityCollectionsRepository<IDepto>
{
    constructor(private departamentosGQL: DepartamentosGQL)
    {
        super();
    }

    @DataAction({subscribeRequired: false})
    public cargarDeptos(): void
    {
        this.departamentosGQL.watch().valueChanges.subscribe((res) =>
        {
            if (isNotNil(res.data))
            {
                this.setAll($cast<IDepto[]>(res.data.deptos));
            }
        });
    }

    public selectId(entity: IDepto): EntityIdType
    {
        return entity._id;
    }
}
