import {StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
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
}
