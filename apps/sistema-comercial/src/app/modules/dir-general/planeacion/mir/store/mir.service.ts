import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {AgregarMirGQL, AgregarMirMutation, MirsPorAnoGQL, MirsPorCentroGestorGQL} from '#/libs/datos/src';
import {MirType} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';

@Injectable({providedIn: 'root'})
export class MirService
{
    constructor(private agregarMirGQL: AgregarMirGQL, private mir: MirsPorAnoGQL, private mirs: MirsPorCentroGestorGQL)
    {
    }
    agregarMir(input: MirType): Observable<SingleExecutionResult<AgregarMirMutation>>
    {
        return this.agregarMirGQL.mutate({input}).pipe();
    }
}
