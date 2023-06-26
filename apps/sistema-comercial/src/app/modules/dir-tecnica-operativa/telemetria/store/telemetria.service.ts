import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {
    ActInstGQL,
    ActInstMutation,
    ActLecturaGQL,
    ActLecturaMutation,
    AgregarBombaGQL, AgregarBombaMutation,
    AgregarMotorGQL, AgregarMotorMutation,
    CrearRegLecturaGQL,
    CrearRegLecturaMutation,
    InstalacionesGQL,
    InstalacionesQuery,
    RegInstalacionGQL,
    RegInstalacionMutation
} from '#/libs/datos/src';
import {ITelemetria, TActInst, IAgregarBomba, IAgregarMotor, TRegInstalacion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {IErrores} from '#/libs/models/src/lib/errors/errores.interface';
import {ITomarMedicion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/instalacion/instalacion.interface';
import {TelemetriaStore} from '@s-dir-tecnica-operativa/store/telemetria.store';

@Injectable({providedIn: 'root'})
export class TelemetriaService
{
    constructor(private instalacionesGQL: InstalacionesGQL, private telemetriaStore: TelemetriaStore, private ngxLoader: NgxUiLoaderService, private regInstalacionGQL: RegInstalacionGQL,
                private actInstGQL: ActInstGQL, private ngxToast: NgxToastService, private crearRegLecturaGQL: CrearRegLecturaGQL, private actLecturaGQL: ActLecturaGQL,
                private agregarMotorGQL: AgregarMotorGQL, private agregarBombaGQL: AgregarBombaGQL)
    {
    }

    instalaciones(ngxLoader: string): Observable<SingleExecutionResult<InstalacionesQuery>>
    {
        this.ngxLoader.startLoader(ngxLoader);
        return this.instalacionesGQL.watch().valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                this.ngxLoader.stopLoader(ngxLoader);
                const inst = res.data.instalaciones as ITelemetria[];

                // this.entityTelemetria.setAll(inst);
                this.telemetriaStore.set(inst);
            }
        }));
    }

    regInstalacion(datos: TRegInstalacion): Observable<SingleExecutionResult<RegInstalacionMutation>>
    {
        return this.regInstalacionGQL.mutate({datos}).pipe(tap((res) =>
        {
            if (res.data.regInstalacion.__typename === 'ErroresType')
            {
                const error = res.data.regInstalacion as IErrores;
                this.ngxToast.alertaToast(error.error, 'Error');
                return;
            }
            const changes = res.data.regInstalacion as ITelemetria;
            // this.entityTelemetria.setOne(changes);
            this.telemetriaStore.add(changes);

            this.ngxToast.satisfactorioToast('La instalacion fue registrada con exito', 'Registro de instalaciones');
        }));
    }

    actInst(args: TActInst): Observable<SingleExecutionResult<ActInstMutation>>
    {
        return this.actInstGQL.mutate({args}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const {_id, ...changes} = res.data.actInst as ITelemetria;

                // this.entityTelemetria.updateOne({id: _id, changes});
                this.telemetriaStore.update(_id, changes);
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
            const agregar = res.data.crearRegLectura as ITelemetria;
            // this.entityTelemetria.setOne(agregar);
            this.telemetriaStore.add(agregar);
            this.ngxToast.satisfactorioToast('Se ha inicializado un nuevo registro de medicion', 'Inicializacion de mediciones');

        }));
    }

    actLectura(args: ITomarMedicion): Observable<SingleExecutionResult<ActLecturaMutation>>
    {
        return this.actLecturaGQL.mutate({args}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const {_id, ...changes} = res.data.actLectura as ITelemetria;
                // this.entityTelemetria.updateOne({id: _id, changes});
                this.telemetriaStore.update(_id, changes);
                this.ngxToast.satisfactorioToast('Medicion actualizada con exito', 'Nivel dinamico - Nivel estatico');
            }
        }));
    }

    agregarMotor(args: IAgregarMotor): Observable<SingleExecutionResult<AgregarMotorMutation>>
    {
        return this.agregarMotorGQL.mutate({args}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const {_id, ...changes} = res.data.agregarMotor as ITelemetria;
                // this.entityTelemetria.updateOne({id: _id, changes});
                this.telemetriaStore.update(_id, changes);
                this.ngxToast.satisfactorioToast('Se ha agregado un motor correctamente', 'Nuevo motor');
            }
        }));
    }

    agregarBomba(args: IAgregarBomba): Observable<SingleExecutionResult<AgregarBombaMutation>>
    {
        return this.agregarBombaGQL.mutate({args}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const {_id, ...changes} = res.data.agregarBomba as ITelemetria;
                // this.entityTelemetria.updateOne({id: _id, changes});
                this.telemetriaStore.update(_id, changes);
                this.ngxToast.satisfactorioToast('Se ha agregado una bomba correctamente', 'Nueva bomba');
            }
        }));
    }
}
