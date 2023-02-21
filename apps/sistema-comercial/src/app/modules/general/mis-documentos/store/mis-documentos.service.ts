import {Injectable} from '@angular/core';
import {DocActFolioGQL, DocFinalizarGQL, DocRefFolioGQL, DocsBusquedaGralGQL, DocsFechasGQL, DocsRefGQL, DocsUsuarioProcesoGQL, ReasignarUsuarioGQL, RegDocGQL, SubirDocsGQL} from '#/libs/datos/src';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {IDocActFolio, IDocsFechas, IDocsUsuarioProceso, IResolveDocumento, TDocRefFolio, TDocumentoReg} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {EntityMisDocumentosStore} from '@s-general/store/entity-mis-documentos.store';
import {NgxUiLoaderService} from 'ngx-ui-loader';

export const loaderMisDocs = 'listaDocs';

@Injectable({providedIn: 'root'})
export class MisDocumentosService
{
    #panel = new BehaviorSubject<boolean>(false);

    constructor(private docsUsuarioProcesoGQL: DocsUsuarioProcesoGQL, private stateAuth: StateAuth, private ngxToast: NgxToastService, private entityMisDocumentos: EntityMisDocumentosStore,
                private docsBuscarGralGQL: DocsBusquedaGralGQL, private docsFechasGQL: DocsFechasGQL, private ngxLoader: NgxUiLoaderService, private regDocGQL: RegDocGQL,
                private finalizarDocGQL: DocFinalizarGQL, private docActFolioGQL: DocActFolioGQL, private subirDocsGQL: SubirDocsGQL, private reasignarUsuarioGQL: ReasignarUsuarioGQL,
                private docsRefGQL: DocsRefGQL, private docRefFolioGQL: DocRefFolioGQL)
    {
    }

    get getPanel(): Observable<boolean>
    {
        return this.#panel.asObservable();
    }

    set setPanel(v: boolean)
    {
        this.#panel.next(v);
    }

    docUsuarioProceso(proceso: 'pendiente' | 'terminado', esEnviadoPor: boolean): Observable<SingleExecutionResult>
    {
        this.ngxLoader.startLoader(loaderMisDocs);
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
                this.ngxLoader.stopLoader(loaderMisDocs);
                setTimeout(() =>
                {
                    const doc = $cast<IResolveDocumento[]>(res.data.docsUsuarioProceso);
                    this.entityMisDocumentos.setAll(doc);
                }, 1000);
            }
        }));
    }

    docsBuscarGral(esEnviadoPor: boolean, consulta: string): Observable<SingleExecutionResult>
    {
        this.ngxLoader.startLoader(loaderMisDocs);
        const idEmpleado = this.stateAuth.snapshot._id;
        return this.docsBuscarGralGQL.watch({usuario: idEmpleado, consulta, esEnviadoPor: esEnviadoPor, enviadoPor: idEmpleado}).valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                this.ngxLoader.stopLoader(loaderMisDocs);
                const listaConsulta = $cast<IResolveDocumento[]>(res.data.docsBusquedaGral);
                this.entityMisDocumentos.setAll(listaConsulta);
            }
        }));
    }

    consultaFechas(fechaInicial: number, fechaFinal: number, esEnviadoPor: boolean): Observable<SingleExecutionResult>
    {
        this.ngxLoader.startLoader(loaderMisDocs);
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
                this.ngxLoader.stopLoader(loaderMisDocs);
                const consultaFechas = $cast<IResolveDocumento[]>(res.data.docsFechas);
                this.entityMisDocumentos.setAll(consultaFechas);
            }
        }));
    }

    regdoc(doc: TDocumentoReg, files): Observable<SingleExecutionResult>
    {
        return this.regDocGQL.mutate({datos: doc, files}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const documento = $cast<IResolveDocumento>(res.data.regDoc);
                this.entityMisDocumentos.addOne(documento);
                this.ngxToast.satisfactorioToast('El documento fue dado de alta con exito', 'Alta documentos');
            }
        }));
    }

    finalizarDoc(id: string): Observable<SingleExecutionResult>
    {
        return this.finalizarDocGQL.mutate({_id: id}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const changes = $cast<IResolveDocumento>(res.data.docFinalizar);
                const documento = {...changes};
                const {_id, ...cambios} = changes;

                this.entityMisDocumentos.updateOne({id: _id, changes: cambios});
                this.entityMisDocumentos.patchState({documento});
                this.ngxToast.satisfactorioToast('El documento ha finalizado con exito', 'Finalizar documentos');
            }
        }));
    }

    docActFolio(args: IDocActFolio): Observable<SingleExecutionResult>
    {
        return this.docActFolioGQL.mutate({args}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const changes = $cast<IResolveDocumento>(res.data.docActFolio);
                const documento = {...changes};
                const {_id, ...cambios} = changes;
                this.entityMisDocumentos.updateOne({id: _id, changes: cambios});
                this.entityMisDocumentos.patchState({documento});
                this.ngxToast.satisfactorioToast('Folio generado con exito', 'Generar folio');
            }
        }));
    }

    subirDocs(args, file, filesAcuse): Observable<SingleExecutionResult>
    {
        return this.subirDocsGQL.mutate({args, files: {file, carpeta: 'documentos'}, filesAcuse: {file: filesAcuse, carpeta: 'documentos'}}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const changes = $cast<IResolveDocumento>(res.data.subirDocs);
                const documento = {...changes};
                const {_id, ...cambios} = changes;
                this.entityMisDocumentos.updateOne({id: _id, changes: cambios});
                this.entityMisDocumentos.patchState({documento});
                this.ngxToast.satisfactorioToast('El documento se ha subido con exito', 'Subir documentos');
            }
        }));
    }

    reasignacionUsuarios(id: string, usuarios: string[]): Observable<SingleExecutionResult>
    {
        return this.reasignarUsuarioGQL.mutate({usuarios: {_id: id, usuarios}}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const changes = $cast<IResolveDocumento>(res.data.reasignarUsuario);
                const documento = {...changes};
                const {_id, ...cambios} = changes;
                this.entityMisDocumentos.updateOne({id: _id, changes: cambios});
                this.entityMisDocumentos.patchState({documento});
                this.ngxToast.satisfactorioToast('La reasignacion se ha realizado con exito', 'Reasignacion de usuarios');
            }
        }));
    }

    docsRef(): Observable<SingleExecutionResult>
    {
        return this.docsRefGQL.watch({_id: this.entityMisDocumentos.snapshot.documento._id, usuario: this.stateAuth.snapshot._id}).valueChanges;
    }

    docRefFolio(ref: string[]): Observable<SingleExecutionResult>
    {
        const entradas: TDocRefFolio =
            {
                _id: this.entityMisDocumentos.snapshot.documento._id,
                folio: this.entityMisDocumentos.snapshot.documento.folio,
                usuarioFolio: this.stateAuth.snapshot._id,
                ref,
            };
        return this.docRefFolioGQL.mutate({entradas}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const changes = $cast<IResolveDocumento>(res.data.docRefFolio);
                const documento = {...changes};
                const {_id, ...cambios} = changes;
                this.entityMisDocumentos.updateOne({id: _id, changes: cambios});
                this.entityMisDocumentos.patchState({documento});
                this.ngxToast.satisfactorioToast('La referencia se creo correctamente', 'Referenciar folio');
            }
        }));
    }
}
