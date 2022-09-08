import {makeVar, ReactiveVar} from '@apollo/client';

export const STATE_GRAPHQL: ReactiveVar<string[]> = makeVar<string[]>(null);
