import {Injectable} from '@angular/core';
import {ApiService} from '@shared/services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {crearDepto, deptos} from '@app/modules/admin/deptos/gql/deptos';
import {DeptoModel} from '@app/modules/admin/deptos/models/depto.model';
import {IRespuesta} from '@shared/models/respuesta.model';
import {NgxToastService} from '@shared/services/ngx-toast.service';

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

    crearDepto(input: DeptoModel): Observable<IRespuesta>
    {
        return this.mutation(crearDepto, {input});
    }

    actualizarDepto(): Observable<IRespuesta>
    {
        return null;
    }

    deptos(): Observable<IRespuesta>
    {
        return this.query(deptos);
    }
}
