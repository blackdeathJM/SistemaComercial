import {Injectable} from '@angular/core';
import {AgregarCentroGestorGQL, AgregarCentroGestorMutation, CentrosGestoresGQL, CentrosGestoresQuery} from '#/libs/datos/src';
import {Observable} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
@Injectable({providedIn: 'root'})
export class PlaneacionService
{
    constructor(private agregarCentroGestorGQL: AgregarCentroGestorGQL, private centrosGestoresGQL: CentrosGestoresGQL)
    {
    }

    agregarCentroGestor(args: string): Observable<SingleExecutionResult<AgregarCentroGestorMutation>>
    {
        return this.agregarCentroGestorGQL.mutate({args}).pipe();
    }

    centrosGestores(): Observable<SingleExecutionResult<CentrosGestoresQuery>>
    {
        return this.centrosGestoresGQL.fetch();
    }
}
