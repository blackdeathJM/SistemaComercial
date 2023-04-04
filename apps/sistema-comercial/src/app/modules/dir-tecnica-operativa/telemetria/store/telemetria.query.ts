import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ITelemetriaState, TelemetriaStore} from '@s-dir-tecnica-operativa/store/telemetria.store';
import {ITelemetria} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';

@Injectable({providedIn: 'root'})
export class TelemetriaQuery extends QueryEntity<ITelemetriaState, ITelemetria>
{
    constructor(protected telemetriaStore: TelemetriaStore)
    {
        super(telemetriaStore);
    }
}
