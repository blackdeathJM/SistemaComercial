import {Injectable} from '@angular/core';
import {ApiService} from '@s-shared/services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {crearDepto, deptos} from '@s-app/modules/admin/deptos/gql/deptos';
import {IRespuesta} from '@s-shared/models/respuesta.model';
import {NgxToastService} from '@s-shared/services/ngx-toast.service';

@Injectable({
    providedIn: 'root'
})
export class DeptosService extends ApiService
{
    errorGraphql: string[] = null;

    constructor(apollo: Apollo, ngxToast: NgxToastService)
    {
        super(apollo, ngxToast);
    }

    // crearDepto(input: Depto): Observable<IRespuesta>
    // {
    //     return this.mutation(crearDepto, {input});
    // }

    actualizarDepto(): Observable<IRespuesta>
    {
        return null;
    }

    deptos(): Observable<IRespuesta>
    {
        return this.query(deptos);
    }
}
