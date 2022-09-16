import {makeVar, ReactiveVar} from '@apollo/client';
import {IDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';

export const STATE_DOCS: ReactiveVar<IDocumento[]> = makeVar<IDocumento[]>([]);
