import {Injectable} from '@angular/core';
import {AgregarCentroGestorGQL, AgregarCentroGestorMutation, CentrosGestoresGQL, CentrosGestoresQuery} from '#/libs/datos/src';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {SeleccionType} from '#/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';

@Injectable({providedIn: 'root'})
export class SeleccionService
{
    constructor(private agregarCentroGestorGQL: AgregarCentroGestorGQL, private centrosGestoresGQL: CentrosGestoresGQL, private seleccionStore: SeleccionStore)
    {
    }

    agregarCentroGestor(input: SeleccionType): Observable<SingleExecutionResult<AgregarCentroGestorMutation>>
    {
        return this.agregarCentroGestorGQL.mutate({input}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const seleccion = $cast<SeleccionType>(res.data.agregarCentroGestor);
                this.seleccionStore.setState(seleccion);
            }
        }));
    }

    centrosGestores(): Observable<SingleExecutionResult<CentrosGestoresQuery>>
    {
        return this.centrosGestoresGQL.fetch().pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const seleccion = $cast<SeleccionType>(res.data.centrosGestores);
                this.seleccionStore.setState(seleccion);
            }
        }));
    }
}
