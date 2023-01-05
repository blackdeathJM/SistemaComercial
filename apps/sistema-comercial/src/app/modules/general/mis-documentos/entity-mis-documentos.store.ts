import {Computed, DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {Injectable} from '@angular/core';
import {createEntityCollections, EntityCollections, EntityIdType} from '@angular-ru/cdk/entity';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';

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

    public selectId(entity: IResolveDocumento): EntityIdType
    {
        return entity._id;
    }
}
