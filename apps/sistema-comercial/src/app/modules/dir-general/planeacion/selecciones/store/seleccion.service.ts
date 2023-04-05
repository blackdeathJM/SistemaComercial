import {Injectable} from '@angular/core';
import {RegSeleccionGQL, RegSeleccionMutation, SeleccionesGQL, SeleccionesQuery} from '#/libs/datos/src';
import {Observable, tap} from 'rxjs';
import {makeVar, SingleExecutionResult, useReactiveVar} from '@apollo/client';
import {SeleccionType} from '#/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {SeleccionStore} from '@s-dir-general/selecciones/store/seleccion.store';

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
            if (res.data)
            {
                const seleccion = res.data.regSeleccion as SeleccionType;
                // this.seleccionStore.patchState(seleccion);
                this.seleccionStore.update(seleccion);
            }
        }));
    }

    selecciones(): Observable<SingleExecutionResult<SeleccionesQuery>>
    {
        return this.seleccionesGQL.fetch().pipe(tap((res) =>
        {
            if (res.data)
            {
                const seleccion = res.data.selecciones as SeleccionType;
                // this.seleccionStore.setState(seleccion);
                this.seleccionStore.update(seleccion);
            }
        }));
    }
}
