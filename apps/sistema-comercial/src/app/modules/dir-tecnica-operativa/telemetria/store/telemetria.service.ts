import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {ActInstGQL, ActInstMutation, ActLecturaGQL, ActLecturaMutation, CrearRegLecturaGQL, CrearRegLecturaMutation, InstalacionesGQL, InstalacionesQuery, RegInstalacionGQL, RegInstalacionMutation} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {ITelemetria, TActInst, TRegInstalacion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {IErrores} from '#/libs/models/src/lib/errors/errores.interface';
import {ITomarMedicion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/instalacion/instalacion.interface';

@Injectable({providedIn: 'root'})
export class TelemetriaService
{
    constructor(private instalacionesGQL: InstalacionesGQL, private entityTelemetria: EntityTelemetria, private ngxLoader: NgxUiLoaderService, private regInstalacionGQL: RegInstalacionGQL,
                private actInstGQL: ActInstGQL, private ngxToast: NgxToastService, private crearRegLecturaGQL: CrearRegLecturaGQL, private actLecturaGQL: ActLecturaGQL)
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
            if (res.data.regInstalacion.__typename === 'ErroresType')
            {
                const error = $cast<IErrores>(res.data.regInstalacion);
                this.ngxToast.alertaToast(error.error, 'Error');
                return;
            }
            const changes = $cast<ITelemetria>(res.data.regInstalacion);
            this.entityTelemetria.setOne(changes);
            this.ngxToast.satisfactorioToast('La instalacion fue registrada con exito', 'Registro de instalaciones');
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

    crearRegLectura(args: ITomarMedicion): Observable<SingleExecutionResult<CrearRegLecturaMutation>>
    {
        return this.crearRegLecturaGQL.mutate({args}).pipe(tap((res) =>
        {
            if (res.data.crearRegLectura.__typename === 'ErroresType')
            {
                this.ngxToast.alertaToast(res.data.crearRegLectura.error, 'No se puedo crear el registro');
                return;
            }
            const agregar = $cast<ITelemetria>(res.data.crearRegLectura);
            this.entityTelemetria.setOne(agregar);
            this.ngxToast.satisfactorioToast('Se ha inicializado un nuevo registro de medicion', 'Inicializacion de mediciones');

        }));
    }

    actLectura(args: ITomarMedicion): Observable<SingleExecutionResult<ActLecturaMutation>>
    {
        return this.actLecturaGQL.mutate({args}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const changes = $cast<ITelemetria>(res.data.actLectura);
                this.entityTelemetria.updateOne({id: changes._id, changes});
            }
        }));
    }
}
