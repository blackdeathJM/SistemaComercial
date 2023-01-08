import {Computed, StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {createEntityCollections, EntityIdType} from '@angular-ru/cdk/entity';
import {Injectable} from '@angular/core';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {INotificacion} from '#/libs/models/src/lib/general/notificacion/notificacion.interface';
import {map, Observable} from 'rxjs';

@StateRepository()
@State({
    name: 'notificaciones',
    defaults: createEntityCollections()
})
@Injectable()
export class EntityNotificacion extends NgxsDataEntityCollectionsRepository<INotificacion, EntityIdType>
{
    @Computed()
    public get sinLeer$(): Observable<number>
    {
        return this.entitiesArray$.pipe(map(res => res.filter(va => !va.leido).length));
    }

    public selectId(entity: INotificacion): EntityIdType
    {
        return entity._id;
    }
}
