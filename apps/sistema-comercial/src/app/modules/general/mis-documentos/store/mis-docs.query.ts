import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {IMisDocsState, MisDocsStore} from '@s-general/store/mis-docs.store';
import {IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';

@Injectable({providedIn: 'root'})
export class MisDocsQuery extends QueryEntity<IMisDocsState, IResolveDocumento>
{
    constructor(protected misDocsStore: MisDocsStore)
    {
        super(misDocsStore);
    }
}
