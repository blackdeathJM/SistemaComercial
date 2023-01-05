import {Computed, DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {IDocsUsuarioProceso, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {Injectable} from '@angular/core';
import {createEntityCollections, EntityCollections, EntityIdType} from '@angular-ru/cdk/entity';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {DocsUsuarioProcesoGQL} from '#/libs/datos/src';
import {StateAuth} from '@s-core/auth/auth.store';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {finalize} from "rxjs";

export interface IDocSeleccionar
{
    documento: IResolveDocumento;
}

@StateRepository()
@State({
    name: 'misDocumentos',
    defaults: {
        ...createEntityCollections(),
        documento: null
    }
})
@Injectable()
export class EntityMisDocumentosStore extends NgxsDataEntityCollectionsRepository<IResolveDocumento, EntityIdType, IDocSeleccionar>
{
    private cargandoDatos = false;

    constructor(private docsUsuarioProcesoGQL: DocsUsuarioProcesoGQL, private stateAuth: StateAuth)
    {
        super();
    }

    @Computed()
    public get cargando(): boolean
    {
        return this.cargandoDatos;
    }

    @Computed()
    public get longDocs(): boolean
    {
        return this.entitiesArray.length === 0;
    }

    @Selector()
    public static documento(stateDoc: EntityCollections<IResolveDocumento, EntityIdType, IDocSeleccionar>): IResolveDocumento
    {
        return stateDoc.documento;
    }

    @DataAction()
    public seleccionarDoc(@Payload('seleccionarDoc') documento: IResolveDocumento): void
    {
        const state = this.getState();
        this.setEntitiesState({
            ...state,
            documento
        });
    }

    @DataAction()
    public cargarDocsPorProceso(@Payload('seleccionarDocsProcesoYEnviadoPor') proceso: 'pendiente' | 'terminado', esEnviadoPor: boolean): void
    {
        // Realizamos consulta para obtener los documentos de la carga inicial en la cual checamos el proceso y si es enviado por mi o son para mi
        this.cargandoDatos = true;
        const args: IDocsUsuarioProceso =
            {
                enviadoPor: this.stateAuth.snapshot._id,
                esEnviadoPor,
                proceso,
                usuario: this.stateAuth.snapshot._id
            };

        this.docsUsuarioProcesoGQL.watch({...args}).valueChanges.subscribe((res) =>
        {
            if (isNotNil(res.data))
            {
                const documentos = $cast<IResolveDocumento[]>(res.data.docsUsuarioProceso);
                console.log('documentos', documentos);
                this.setAll(documentos);
            }
            this.cargandoDatos = false;
        });
    }

    public selectId(entity: IResolveDocumento): EntityIdType
    {
        return entity._id;
    }
}
