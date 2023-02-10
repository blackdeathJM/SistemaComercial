import {StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {createEntityCollections} from '@angular-ru/cdk/entity';

export interface ITelemetriaSelect
{
    instalacion;
}

@StateRepository()
@State({
    name: 'telemetria', defaults: {
        ...createEntityCollections(),
        instalacion: null
    }
})
export class EntityTelemetria
{

}
