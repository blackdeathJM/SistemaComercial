import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {ITelemetria} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';
import {Injectable} from '@angular/core';

export interface ITelemetriaState extends EntityState<ITelemetria, string>, ActiveState
{
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'Telemetria', idKey: '_id'})
export class TelemetriaStore extends EntityStore<ITelemetriaState, ITelemetria>
{
    constructor()
    {
        super();
    }
}
