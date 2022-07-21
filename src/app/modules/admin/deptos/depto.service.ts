import {Injectable} from '@angular/core';
import {ApiService} from '@shared/services/api.service';
import {Apollo} from 'apollo-angular';
import {IDepto} from '@app/modules/admin/deptos/models/depto.interface';
import {Observable} from 'rxjs';
import {crearDepto} from '@app/modules/admin/deptos/gql/deptos';

@Injectable({
    providedIn: 'root'
})
export class DeptoService extends ApiService
{

    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    crearDepto(depto: IDepto): Observable<IDepto[]>
    {
        return this.mutation(crearDepto, {depto}, {}, ['data']);
    }
}
