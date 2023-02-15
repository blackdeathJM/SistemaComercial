import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {InstalacionesGQL, InstalacionesQuery, RegInstalacionGQL, RegInstalacionMutation} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {ITelemetria, TRegInstalacion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Injectable({providedIn: 'root'})
export class TelemetriaService
{
    constructor(private instalacionesGQL: InstalacionesGQL, private entityTelemetria: EntityTelemetria, private ngxLoader: NgxUiLoaderService, private regInstalacionGQL: RegInstalacionGQL)
    {
    }

    instalaciones(ngxLoader: string): Observable<SingleExecutionResult<InstalacionesQuery>>
    {
        this.ngxLoader.startLoader(ngxLoader);
        return this.instalacionesGQL.watch().valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                this.ngxLoader.stopLoader(ngxLoader);
                const inst = $cast<ITelemetria[]>(res.data.instalaciones);
                this.entityTelemetria.setAll(inst);
            }
        }));
    }

    regInstalacion(datos: TRegInstalacion): Observable<SingleExecutionResult<RegInstalacionMutation>>
    {
        return this.regInstalacionGQL.mutate({datos}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const changes = $cast<ITelemetria>(res.data.regInstalacion);
                this.entityTelemetria.setOne(changes);
            }
        }));
    }
}
