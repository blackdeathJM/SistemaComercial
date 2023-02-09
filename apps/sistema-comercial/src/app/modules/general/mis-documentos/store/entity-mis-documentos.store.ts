import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
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

    @Selector()
    public static documento(stateDoc: EntityCollections<IResolveDocumento, EntityIdType, IDocSeleccionar>): IResolveDocumento
    {
        return stateDoc.documento;
    }

    @DataAction()
    filtrar(proceso: string): void
    {
        const estado = this.getState();
        const filtro = this.entitiesArray.filter(v => v.proceso === proceso);
        this.setAll(filtro);
        console.log('estado', estado);
        console.log('filtro', filtro);
    }

    // @DataAction()
    // public seleccionarDoc(@Payload('seleccionarDoc') documento: IResolveDocumento): void
    // {
    //     // const state = this.getState();
    //     // this.setEntitiesState({
    //     //     ...state,
    //     //     documento
    //     // });
    //     const docSele = this.selectOne(documento._id);
    //     this.ctx.patchState({documento: docSele});
    // }

    public selectId(entity: IResolveDocumento): EntityIdType
    {
        return entity._id;
    }
}
