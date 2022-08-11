import {makeVar, ReactiveVar, useReactiveVar} from '@apollo/client';
import {IDepto} from '#/libs/models/src';

export const STATE_DEPTOS: ReactiveVar<IDepto[]> = makeVar<IDepto[]>([]);
