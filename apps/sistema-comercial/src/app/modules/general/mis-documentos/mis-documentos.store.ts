import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {IDocumento, TDocumentoReg} from '#/libs/models/src/lib/general/documentos/documento.interface';

@StateRepository()
@State<IDocumento[]>({defaults: [], name: 'MisDocumentos'})
@Injectable()
export class MisDocumentosStore extends NgxsImmutableDataRepository<IDocumento[]>
{
    constructor()
    {
        super();
    }
    @DataAction({subscribeRequired: false})
    public regDoc(@Payload('crear doc')datos: TDocumentoReg): void
    {

    }
}

