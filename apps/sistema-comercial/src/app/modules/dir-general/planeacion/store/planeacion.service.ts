import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { IResolvePlaneacion } from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import { FilCentroGestorMirGQL, FilCentroGestorMirQuery, FilTodosGQL, FilTodosQuery, InicializarPlaneacionGQL, InicializarPlaneacionMutation, RegMirGQL } from '#/libs/datos/src';
import { PlaneacionStore } from '@s-dir-general/store/planeacion.store';
import { makeVar, SingleExecutionResult } from '@apollo/client';
import { TPlaneacionType } from '#/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import { NgxToastService } from '@s-services/ngx-toast.service';
import { GeneralService } from '@s-services/general.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TFilCentroGestorMir, TRegMir } from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';

export const loaderPlaneacion = 'loaderPlaneacion';

export const idPlaneacion = makeVar<string>(null);

@Injectable({ providedIn: 'root' })
export class PlaneacionService
{
    constructor(private filTodosGQL: FilTodosGQL, private inicializarPlaneacionGQL: InicializarPlaneacionGQL, private planeacionStore: PlaneacionStore, private ngxToast: NgxToastService,
                private generalService: GeneralService, private ngxLoader: NgxUiLoaderService, private regMirGQL: RegMirGQL,
                private filCentroGestorMirGQL: FilCentroGestorMirGQL)
    {
    }

    filTodos(): Observable<SingleExecutionResult<FilTodosQuery>>
    {
        return this.filTodosGQL.fetch().pipe(catchError((err) => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res && res.data)
            {
                const planeacion = res.data.filTodos as IResolvePlaneacion[];
                this.planeacionStore.set(planeacion);
            }
        }));
    }

    filPorAno(_id: string): void
    {
        idPlaneacion(_id);
        this.planeacionStore.setActive(_id);
    }

    filCentroGestorMir(args: TFilCentroGestorMir): Observable<SingleExecutionResult<FilCentroGestorMirQuery>>
    {
        return this.filCentroGestorMirGQL.fetch({ _id: args._id, centroGestor: args.centroGestor }).pipe(catchError(err => this.generalService.cacharError(err)),
            tap((res) =>
            {
                if (res && res.data)
                {
                    const { _id, ...datos } = res.data.filCentroGestorMir as IResolvePlaneacion;
                    this.planeacionStore.update(_id, datos);
                    // this.planeacionStore.setActive(_id);
                }
            }));
    }

    inicializarPlaneacion(input: TPlaneacionType): Observable<SingleExecutionResult<InicializarPlaneacionMutation>>
    {
        return this.inicializarPlaneacionGQL.mutate({ input }).pipe(catchError((err) => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res && res.data)
            {
                const planeacionInicializado = res.data.inicializarPlaneacion as IResolvePlaneacion;

                this.planeacionStore.add(planeacionInicializado);
            }
        }));
    }

    regMir(datos: TRegMir): Observable<SingleExecutionResult>
    {
        return this.regMirGQL.mutate({ datos }).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res && res.data)
            {
                const { _id, ...cambio } = res.data.regMir as IResolvePlaneacion;
                this.planeacionStore.replace(_id, cambio);
            }
        }));
    }
}
