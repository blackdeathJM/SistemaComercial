import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {IDepto} from '@app/modules/admin/deptos/models/depto.interface';
import {State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@angular-ru/ngxs/repositories';
import {DeptoService} from '@app/modules/admin/deptos/depto.service';
import {ApiService} from '@shared/services/api.service';
import {Observable, tap} from 'rxjs';
import {crearDepto} from '@app/modules/admin/deptos/gql/deptos';

@StateRepository()
@State<IDepto[]>({
    name: 'Deptos',
    defaults: []
})
@Injectable()
export class DeptoState extends NgxsDataRepository<IDepto[]>
{
    constructor(private deptoService: DeptoService, private apiService: ApiService)
    {
        super();
    }

    @DataAction()
    crearDepto(@Payload('Depto') depto: IDepto): Observable<IDepto[]>
    {
        return this.apiService.mutation(crearDepto, {input: depto}, {}, ['data']).pipe(tap((res) =>
        {
            console.log(res);
        }));
    }

    // public deptos()
}
