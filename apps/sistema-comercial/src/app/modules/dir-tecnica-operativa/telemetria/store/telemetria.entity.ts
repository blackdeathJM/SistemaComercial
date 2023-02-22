import {StateRepository, DataAction} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {ITelemetria} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';

export interface ITelemetriaSelect
{
    instalacion: ITelemetria;
}

@StateRepository()
@State({
    name: 'telemetria', defaults: {
        ...createEntityCollections(),
        instalacion: null
    }
})
export class EntityTelemetria extends NgxsDataEntityCollectionsRepository<ITelemetria, string, ITelemetriaSelect>
{
    public override primaryKey = '_id';

    @DataAction({subscribeRequired: false})
    seleccionarInst(id: string): void
    {
        const instalacion = this.selectOne(id);
        this.patchState({instalacion});
    }
}
