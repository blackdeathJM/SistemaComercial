import {makeVar, ReactiveVar, useReactiveVar} from '@apollo/client';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
export const STATE_DEPTOS: ReactiveVar<IDepto[]> = makeVar<IDepto[]>([]);
