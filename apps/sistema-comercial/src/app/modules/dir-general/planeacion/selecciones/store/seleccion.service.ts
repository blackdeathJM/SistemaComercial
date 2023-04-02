import {Injectable} from '@angular/core';
import {RegSeleccionGQL, RegSeleccionMutation, SeleccionesGQL, SeleccionesQuery} from '#/libs/datos/src';
import {Observable, tap} from 'rxjs';
import {makeVar, SingleExecutionResult, useReactiveVar} from '@apollo/client';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {SeleccionStore} from '@s-dir-general/selecciones/store/seleccion.store';
import {SeleccionType} from '#/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';

@Injectable({providedIn: 'root'})
export class SeleccionService
{
    dirComercialCalculos = makeVar(false);
    constructor(private regSeleccionGQL: RegSeleccionGQL, private seleccionesGQL: SeleccionesGQL, private seleccionStore: SeleccionStore)
    {
    }
    habCalculoComercial(): boolean
    {
        return useReactiveVar(this.dirComercialCalculos);
    }
    agregarCentroGestor(input: SeleccionType): Observable<SingleExecutionResult<RegSeleccionMutation>>
    {
        return this.regSeleccionGQL.mutate({input}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const seleccion = $cast<SeleccionType>(res.data.regSeleccion);
                this.seleccionStore.patchState(seleccion);
            }
        }));
    }

    selecciones(): Observable<SingleExecutionResult<SeleccionesQuery>>
    {
        return this.seleccionesGQL.fetch().pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const seleccion = $cast<SeleccionType>(res.data.selecciones);
                this.seleccionStore.setState(seleccion);
            }
        }));
    }
}
