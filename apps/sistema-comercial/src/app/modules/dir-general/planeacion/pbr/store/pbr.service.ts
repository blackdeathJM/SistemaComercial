import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {RegPbrGQL, RegPbrMutation} from '#/libs/datos/src';
import {TRegPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr-consultas.dto';

@Injectable()
export class PbrService
{
    constructor(private regPbrGQL: RegPbrGQL)
    {
    }
    regPbr(input: TRegPbr): Observable<SingleExecutionResult<RegPbrMutation>>
    {
        return this.regPbrGQL.mutate({input}).pipe();
    }
}
