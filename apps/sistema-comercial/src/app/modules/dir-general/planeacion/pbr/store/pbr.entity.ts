import {IResPbrEmpleado} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';

export interface IPbrSeleccion
{
    pbr: IResPbrEmpleado;
}

@StateRepository()
@State({
    name: 'Pbr'
})
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
