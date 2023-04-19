import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPlaneacion } from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import { FilTodosGQL, FilTodosQuery, InicializarPlaneacionGQL, InicializarPlaneacionMutation } from '#/libs/datos/src';
import { PlaneacionStore } from '@s-dir-general/store/planeacion.store';
import { SingleExecutionResult } from '@apollo/client';
import { TPlaneacionType } from '#/libs/models/src/lib/dir-general/planeacion/planeacion.dto';

@Injectable({ providedIn: 'root' })
export class PlaneacionService
{
    constructor(private filTodosGQL: FilTodosGQL, private inicializarPlaneacionGQL: InicializarPlaneacionGQL, private planeacionStore: PlaneacionStore)
    {
    }

    filTodos(): Observable<SingleExecutionResult<FilTodosQuery>>
    {
        return this.filTodosGQL.fetch().pipe(tap((res) =>
        {
            if (res.data)
            {
                const planeacion = res.data.filTodos as IPlaneacion[];
                this.planeacionStore.set(planeacion);
            }
        }));
    }

    inicializarPlaneacion(input: TPlaneacionType): Observable<SingleExecutionResult<InicializarPlaneacionMutation>>
    {
        return this.inicializarPlaneacionGQL.mutate({ input }).pipe(tap((res) =>
        {
            if (res.data)
            {
                const planeacionInicializado = res.data.inicializarPlaneacion as IPlaneacion;

                this.planeacionStore.add(planeacionInicializado, {});
            }
        }));
    }
}
