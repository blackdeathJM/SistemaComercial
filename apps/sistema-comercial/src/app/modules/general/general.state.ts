import {makeVar, ReactiveVar} from '@apollo/client';
import {IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';

export const STATE_DOCS: ReactiveVar<IResolveDocumento[]> = makeVar<IResolveDocumento[]>([]);
