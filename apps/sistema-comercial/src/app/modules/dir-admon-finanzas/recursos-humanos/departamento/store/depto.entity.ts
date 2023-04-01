import {StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {Injectable} from '@angular/core';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {IDepto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface';

@StateRepository()
@State({
    name: 'deptos',
    defaults: {
        ...createEntityCollections(),
        depto: null
    }
})
@Injectable()
export class DeptoEntity extends NgxsDataEntityCollectionsRepository<IDepto, string>
{
    public override primaryKey = '_id';
}
