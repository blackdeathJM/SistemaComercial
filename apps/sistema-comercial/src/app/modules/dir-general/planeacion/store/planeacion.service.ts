import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { IPlaneacion } from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import { FilTodosGQL, FilTodosQuery, InicializarPlaneacionGQL, InicializarPlaneacionMutation } from '#/libs/datos/src';
import { PlaneacionStore } from '@s-dir-general/store/planeacion.store';
import { SingleExecutionResult } from '@apollo/client';
import { TPlaneacionType } from '#/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import { NgxToastService } from '@s-services/ngx-toast.service';
import { GeneralService } from '@s-services/general.service';

@Injectable({ providedIn: 'root' })
export class PlaneacionService
{
    constructor(private filTodosGQL: FilTodosGQL, private inicializarPlaneacionGQL: InicializarPlaneacionGQL, private planeacionStore: PlaneacionStore, private ngxToast: NgxToastService,
                private generalService: GeneralService)
    {
    }

    filTodos(): Observable<SingleExecutionResult<FilTodosQuery>>
    {
        return this.filTodosGQL.fetch().pipe(catchError((err) => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res && res.data)
            {
                const planeacion = res.data.filTodos as IPlaneacion[];
                this.planeacionStore.set(planeacion);
            }
        }));
    }

    inicializarPlaneacion(input: TPlaneacionType): Observable<SingleExecutionResult<InicializarPlaneacionMutation>>
    {
        return this.inicializarPlaneacionGQL.mutate({ input }).pipe(catchError((err) => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res && res.data)
            {
                const planeacionInicializado = res.data.inicializarPlaneacion as IPlaneacion;

                this.planeacionStore.add(planeacionInicializado, {});
            }
        }));
    }
}
