import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {IDocsUsuarioProceso, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {Injectable} from '@angular/core';
import {createEntityCollections, EntityCollections, EntityIdType} from '@angular-ru/cdk/entity';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {DocsUsuarioProcesoGQL} from '#/libs/datos/src';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {NgxUiLoaderService} from 'ngx-ui-loader';

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

    constructor(private docsUsuarioProcesoGQL: DocsUsuarioProcesoGQL, private stateAuth: StateAuth, private ngxLoader: NgxUiLoaderService)
    {
        super();
    }

    @Selector()
    public static documento(stateDoc: EntityCollections<IResolveDocumento, EntityIdType, IDocSeleccionar>): IResolveDocumento
    {
        return stateDoc.documento;
    }

    @DataAction()
    public seleccionarDoc(@Payload('seleccionarDoc') docSelect: IResolveDocumento): void
    {
        // const state = this.getState();
        // this.setEntitiesState({
        //     ...state,
        //     documento
        // });
        const documento = $cast<IResolveDocumento>(docSelect);
        this.ctx.patchState({documento});
    }

    public selectId(entity: IResolveDocumento): EntityIdType
    {
        return entity._id;
    }
}
