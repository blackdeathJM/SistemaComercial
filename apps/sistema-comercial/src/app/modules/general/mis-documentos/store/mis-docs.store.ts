import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {Injectable} from '@angular/core';

export interface IMisDocsState extends EntityState<IResolveDocumento, string>, ActiveState
{
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'Documentacion', idKey: '_id'})
export class MisDocsStore extends EntityStore<IMisDocsState, IResolveDocumento>
{
    constructor()
    {
        super();
    }
}
