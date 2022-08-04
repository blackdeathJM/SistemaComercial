import {makeVar, ReactiveVar} from '@apollo/client';

export const GRAPHQL_STATE: ReactiveVar<string[]> = makeVar<string[]>(null);
