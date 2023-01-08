import {Injectable} from '@angular/core';
import {DocsBusquedaGralGQL, DocsFechasGQL, DocsUsuarioProcesoGQL} from '#/libs/datos/src';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {IDocsFechas, IDocsUsuarioProceso, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {EntityMisDocumentosStore} from '@s-general/store/entity-mis-documentos.store';

@Injectable({providedIn: 'root'})
export class MisDocumentosService
{
    constructor(private docsUsuarioProcesoGQL: DocsUsuarioProcesoGQL, private stateAuth: StateAuth, private ngxToast: NgxToastService, private entityMisDocumentos: EntityMisDocumentosStore,
                private docsBuscarGralGQL: DocsBusquedaGralGQL, private docsFechasGQL: DocsFechasGQL)
    {
    }

    docUsuarioProceso(proceso: 'pendiente' | 'terminado', esEnviadoPor: boolean): Observable<SingleExecutionResult>
    {
        const args: IDocsUsuarioProceso =
            {
                enviadoPor: this.stateAuth.snapshot._id,
                esEnviadoPor,
                proceso,
                usuario: this.stateAuth.snapshot._id
            };

        return this.docsUsuarioProcesoGQL.watch({...args}).valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const doc = $cast<IResolveDocumento[]>(res.data.docsUsuarioProceso);
                this.entityMisDocumentos.setAll(doc);
            }
        }));
    }

    docsBuscarGral(esEnviadoPor: boolean, consulta: string): Observable<SingleExecutionResult>
    {
        const idEmpleado = this.stateAuth.snapshot._id;
        return this.docsBuscarGralGQL.watch({usuario: idEmpleado, consulta, esEnviadoPor: esEnviadoPor, enviadoPor: idEmpleado}).valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const listaConsulta = $cast<IResolveDocumento[]>(res.data.docsBusquedaGral);
                this.entityMisDocumentos.setAll(listaConsulta);
            }
        }));
    }

    consultaFechas(fechaInicial: number, fechaFinal: number, esEnviadoPor: boolean): Observable<SingleExecutionResult>
    {
        const consulta: IDocsFechas =
            {
                enviadoPor: this.stateAuth.snapshot._id,
                usuario: this.stateAuth.snapshot._id,
                esEnviadoPor,
                fechaInicial,
                fechaFinal
            };
        return this.docsFechasGQL.watch({...consulta}).valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const consultaFechas = $cast<IResolveDocumento[]>(res.data.docsFechas);
                this.entityMisDocumentos.setAll(consultaFechas);
            }
        }));
    }
}
