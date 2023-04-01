import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {IMir} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface';

export interface IMirSeleccion
{
    mir: IMir;
}

@StateRepository()
@State({
    name: 'mir',
    defaults: {
        ...createEntityCollections(),
        mir: null
    }
})
export class EntityMir extends NgxsDataEntityCollectionsRepository<IMir, string, IMirSeleccion>
{
    public override primaryKey = '_id';

    @DataAction({subscribeRequired: false})
    seleccionarMir(id: string): void
    {
        const mir = this.selectOne(id);
        this.patchState({mir});
    }
}
