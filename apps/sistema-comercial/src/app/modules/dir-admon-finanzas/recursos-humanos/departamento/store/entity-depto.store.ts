import {StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {createEntityCollections, EntityCollections} from '@angular-ru/cdk/entity';
import {Injectable} from '@angular/core';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {IDepto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface';

export interface IDeptoSelect
{
    depto: IDepto;
}

@StateRepository()
@State({
    name: 'deptos',
    defaults: {
        ...createEntityCollections(),
        depto: null
    }
})
@Injectable()
export class EntityDeptoStore extends NgxsDataEntityCollectionsRepository<IDepto, string, IDeptoSelect>
{
    public override primaryKey = '_id';

    @Selector()
    public static depto(stateDepto: EntityCollections<IDepto, string, IDeptoSelect>): IDepto
    {
        return stateDepto.depto;
    }
}
