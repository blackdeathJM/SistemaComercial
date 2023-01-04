import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {Injectable} from '@angular/core';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {DepartamentosGQL} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';

@StateRepository()
@State({
    name: 'deptos',
    defaults: createEntityCollections<IDepto>()
})
@Injectable()
export class EntityDeptoStore extends NgxsDataEntityCollectionsRepository<IDepto, string>
{
    public override primaryKey = '_id';

    constructor(private departamentosGQL: DepartamentosGQL)
    {
        super();
    }

    @DataAction()
    public cargarDeptos(): void
    {
        this.departamentosGQL.watch().valueChanges.subscribe((res) =>
        {
            if (isNotNil(res.data))
            {
                const deptos = $cast<IDepto[]>(res.data.deptos);
                this.setAll(deptos);
            }
        });
    }
}
