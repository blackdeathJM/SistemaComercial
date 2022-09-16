import {Injectable} from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DocsUsuarioProcesoGQL} from '#/libs/datos/src';
import {STATE_DOCS} from '@s-app/general/general.state';
import {IDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {STATE_DATOS_SESION} from "@s-app/auth/auth.state";

@Injectable({
    providedIn: 'root'
})
export class DocsResolver implements Resolve<boolean>
{
    constructor(private docsUsuarioProcesoGQL: DocsUsuarioProcesoGQL)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    {
        this.docsUsuarioProcesoGQL.watch({datos: {ano: new Date().getFullYear(), enviadoPor: STATE_DATOS_SESION()._id}}).valueChanges.pipe().subscribe((res) =>
        {
            if (res.data)
            {
                STATE_DOCS(res.data.docsUsuarioProceso as IDocumento[]);
            }
        });
        return of(true);
    }
}
