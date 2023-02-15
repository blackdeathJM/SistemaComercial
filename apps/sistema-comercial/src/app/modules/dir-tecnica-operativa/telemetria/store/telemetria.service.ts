import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {ActInstGQL, ActInstMutation, InstalacionesGQL, InstalacionesQuery, RegInstalacionGQL, RegInstalacionMutation} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {ITelemetria, TActInst, TRegInstalacion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxToastService} from '@s-services/ngx-toast.service';

@Injectable({providedIn: 'root'})
export class TelemetriaService
{
    constructor(private instalacionesGQL: InstalacionesGQL, private entityTelemetria: EntityTelemetria, private ngxLoader: NgxUiLoaderService, private regInstalacionGQL: RegInstalacionGQL,
                private actInstGQL: ActInstGQL, private ngxToast: NgxToastService)
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
                this.ngxToast.satisfactorioToast('La instalacion fue registrada con exito', 'Registro de instalaciones');
            }
        }));
    }

    actInst(args: TActInst): Observable<SingleExecutionResult<ActInstMutation>>
    {
        return this.actInstGQL.mutate({args}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const changes = $cast<ITelemetria>(res.data.actInst);
                this.entityTelemetria.updateOne({id: changes._id, changes});
                this.ngxToast.satisfactorioToast('La instalacion fue actualizada con exito', 'Actualizacion');
            }
        }));
    }
}
