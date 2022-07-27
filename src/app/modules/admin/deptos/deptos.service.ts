import {Injectable} from '@angular/core';
import {ApiService} from '@shared/services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable, tap} from 'rxjs';
import {crearDepto, deptos} from '@app/modules/admin/deptos/gql/deptos';
import {DeptoModel} from '@app/modules/admin/deptos/models/depto.model';
import {IErrors, IRespuesta} from '@shared/models/respuesta.model';

@Injectable({
    providedIn: 'root'
})
export class DeptosService extends ApiService
{
    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    crearDepto(input: DeptoModel): Observable<IRespuesta>
    {
        return this.mutation(crearDepto, {input}, {}, []);
    }

    deptos(): Observable<IRespuesta>
    {
        return this.query(deptos, {}, {});
    }

}
