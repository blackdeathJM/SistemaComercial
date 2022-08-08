import {Injectable} from '@angular/core';
import {ApiService} from 'libs/services/src/lib/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {crearDepto, deptos} from 'libs/datos/src/lib/admin/depto/graphql/deptos';
import {IRespuesta} from 'libs/models/src/lib/respuesta.model';
import {NgxToastService} from 'libs/services/src/lib/ngx-toast.service';
import {Depto} from 'apps/sistema-comercial/src/app/modules/admin/deptos/model/depto';

@Injectable({
    providedIn: 'root'
})
export class DeptosWebService extends ApiService
{
    constructor(apollo: Apollo, ngxToast: NgxToastService)
    {
        super(apollo, ngxToast);
    }

    crearDepto(input: Depto): Observable<IRespuesta>
    {
        return this.mutation(crearDepto, {input});
    }

    actualizarDepto(): Observable<IRespuesta> | null
    {
        return null;
    }

    deptos(): Observable<IRespuesta>
    {
        return this.query(deptos);
    }
}
