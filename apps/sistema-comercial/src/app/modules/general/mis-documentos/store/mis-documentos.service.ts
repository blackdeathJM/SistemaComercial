import {Injectable} from '@angular/core';
import {DocActFolioGQL, DocFinalizarGQL, DocRefFolioGQL, DocsBusquedaGralGQL, DocsFechasGQL, DocsRefGQL, DocsUsuarioProcesoGQL, ReasignarUsuarioGQL, RegDocGQL, SubirDocsGQL} from '#/libs/datos/src';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {IDocActFolio, IDocsFechas, IDocsUsuarioProceso, IResolveDocumento, TDocRefFolio, TDocumentoReg} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AuthQuery} from '@s-core/auth/store/auth.query';
import {MisDocsStore} from '@s-general/store/mis-docs.store';
import {MisDocsQuery} from '@s-general/store/mis-docs.query';

export const loaderMisDocs = 'listaDocs';

@Injectable({providedIn: 'root'})
export class MisDocumentosService
{
    #panel = new BehaviorSubject<boolean>(false);

    constructor(private docsUsuarioProcesoGQL: DocsUsuarioProcesoGQL, private authQuery: AuthQuery, private ngxToast: NgxToastService, private misDocsStore: MisDocsStore,
                private docsBuscarGralGQL: DocsBusquedaGralGQL, private docsFechasGQL: DocsFechasGQL, private ngxLoader: NgxUiLoaderService, private regDocGQL: RegDocGQL,
                private finalizarDocGQL: DocFinalizarGQL, private docActFolioGQL: DocActFolioGQL, private subirDocsGQL: SubirDocsGQL, private reasignarUsuarioGQL: ReasignarUsuarioGQL,
                private docsRefGQL: DocsRefGQL, private docRefFolioGQL: DocRefFolioGQL, private misDocsQuery: MisDocsQuery)
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
                enviadoPor: this.authQuery.getValue()._id,
                esEnviadoPor,
                proceso,
                usuario: this.authQuery.getValue()._id
            };

        return this.docsUsuarioProcesoGQL.watch({...args}).valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                this.ngxLoader.stopLoader(loaderMisDocs);
                setTimeout(() =>
                {
                    const doc = res.data.docsUsuarioProceso as IResolveDocumento[];
                    // this.entityMisDocumentos.setAll(doc);
                    this.misDocsStore.set(doc);
                }, 1000);
            }
        }));
    }

    docsBuscarGral(esEnviadoPor: boolean, consulta: string): Observable<SingleExecutionResult>
    {
        this.ngxLoader.startLoader(loaderMisDocs);
        const idEmpleado = this.authQuery.getValue()._id;
        return this.docsBuscarGralGQL.watch({usuario: idEmpleado, consulta, esEnviadoPor: esEnviadoPor, enviadoPor: idEmpleado}).valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                this.ngxLoader.stopLoader(loaderMisDocs);
                const listaConsulta = res.data.docsBusquedaGral as IResolveDocumento[];
                // this.entityMisDocumentos.setAll(listaConsulta);
                this.misDocsStore.set(listaConsulta);
            }
        }));
    }

    consultaFechas(fechaInicial: number, fechaFinal: number, esEnviadoPor: boolean): Observable<SingleExecutionResult>
    {
        this.ngxLoader.startLoader(loaderMisDocs);
        const consulta: IDocsFechas =
            {
                enviadoPor: this.authQuery.getValue()._id,
                usuario: this.authQuery.getValue()._id,
                esEnviadoPor,
                fechaInicial,
                fechaFinal
            };
        return this.docsFechasGQL.watch({...consulta}).valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                this.ngxLoader.stopLoader(loaderMisDocs);
                const consultaFechas = res.data.docsFechas as IResolveDocumento[];
                // this.entityMisDocumentos.setAll(consultaFechas);
                this.misDocsStore.set(consultaFechas);
            }
        }));
    }

    regdoc(doc: TDocumentoReg, files): Observable<SingleExecutionResult>
    {
        return this.regDocGQL.mutate({datos: doc, files}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const documento = res.data.regDoc as IResolveDocumento;
                // this.entityMisDocumentos.addOne(documento);
                this.misDocsStore.add(documento);
                this.ngxToast.satisfactorioToast('El documento fue dado de alta con exito', 'Alta documentos');
            }
        }));
    }

    finalizarDoc(id: string): Observable<SingleExecutionResult>
    {
        return this.finalizarDocGQL.mutate({_id: id}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const {_id, ...changes} = res.data.docFinalizar as IResolveDocumento;
                // this.entityMisDocumentos.updateOne({id: _id, changes});
                // this.entityMisDocumentos.patchState({documento: {_id, ...changes}});
                this.misDocsStore.update(_id, changes);
                this.misDocsStore.setActive(_id);
                this.ngxToast.satisfactorioToast('El documento ha finalizado con exito', 'Finalizar documentos');
            }
        }));
    }

    docActFolio(args: IDocActFolio): Observable<SingleExecutionResult>
    {
        return this.docActFolioGQL.mutate({args}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const {_id, ...changes} = res.data.docActFolio as IResolveDocumento;
                // this.entityMisDocumentos.updateOne({id: _id, changes});
                // this.entityMisDocumentos.patchState({documento: {_id, ...changes}});
                this.misDocsStore.update(_id, changes);
                this.misDocsStore.setActive(_id);
                this.ngxToast.satisfactorioToast('Folio generado con exito', 'Generar folio');
            }
        }));
    }

    subirDocs(args, file, filesAcuse): Observable<SingleExecutionResult>
    {
        return this.subirDocsGQL.mutate({args, files: {file, carpeta: 'documentos'}, filesAcuse: {file: filesAcuse, carpeta: 'documentos'}}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const {_id, ...changes} = res.data.subirDocs as IResolveDocumento;
                // this.entityMisDocumentos.updateOne({id: _id, changes});
                // this.entityMisDocumentos.patchState({documento: {_id, ...changes}});
                this.misDocsStore.update(_id, changes);
                this.misDocsStore.setActive(_id);
                this.ngxToast.satisfactorioToast('El documento se ha subido con exito', 'Subir documentos');
            }
        }));
    }

    reasignacionUsuarios(id: string, usuarios: string[]): Observable<SingleExecutionResult>
    {
        return this.reasignarUsuarioGQL.mutate({usuarios: {_id: id, usuarios}}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const {_id, ...changes} = res.data.reasignarUsuario as IResolveDocumento;
                // this.entityMisDocumentos.updateOne({id: _id, changes});
                // this.entityMisDocumentos.patchState({documento: {_id, ...changes}});
                this.misDocsStore.update(_id, changes);
                this.misDocsStore.setActive(_id);
                this.ngxToast.satisfactorioToast('La reasignacion se ha realizado con exito', 'Reasignacion de usuarios');
            }
        }));
    }

    docsRef(): Observable<SingleExecutionResult>
    {
        return this.docsRefGQL.fetch({_id: this.misDocsQuery.getActive()._id, usuario: this.authQuery.getValue()._id});
    }

    docRefFolio(ref: string[]): Observable<SingleExecutionResult>
    {
        const entradas: TDocRefFolio =
            {
                // _id: this.entityMisDocumentos.snapshot.documento._id,
                // folio: this.entityMisDocumentos.snapshot.documento.folio,
                _id: this.misDocsQuery.getActive()._id,
                folio: this.misDocsQuery.getActive().folio,
                usuarioFolio: this.authQuery.getValue()._id,
                ref,
            };
        return this.docRefFolioGQL.mutate({entradas}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const {_id, ...changes} = res.data.docRefFolio as IResolveDocumento;
                // this.entityMisDocumentos.updateOne({id: _id, changes});
                // this.entityMisDocumentos.patchState({documento: {_id, ...changes}});
                this.misDocsStore.update(_id, changes);
                this.misDocsStore.setActive(_id);
                this.ngxToast.satisfactorioToast('La referencia se creo correctamente', 'Referenciar folio');
            }
        }));
    }
}
