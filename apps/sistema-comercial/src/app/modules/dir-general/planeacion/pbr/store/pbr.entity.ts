import {IResPbrEmpleado} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {Injectable} from '@angular/core';

export interface IPbrSeleccion
{
    pbr: IResPbrEmpleado;
}

@StateRepository()
@State({
    name: 'Pbr',
    defaults: {
        ...createEntityCollections(),
        pbr: null
    }
})
@Injectable({providedIn: 'root'})
export class EntityPbr extends NgxsDataEntityCollectionsRepository<IResPbrEmpleado, string, IPbrSeleccion>
{
    public override primaryKey = '_id';

    @DataAction({subscribeRequired: false})
    seleccionarPbr(id: string): void
    {
        const pbr = this.selectOne(id);
        this.patchState({pbr});
    }
}
