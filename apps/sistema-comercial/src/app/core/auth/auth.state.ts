import {makeVar, ReactiveVar} from '@apollo/client';

export const STATE_TOKEN: ReactiveVar<string> = makeVar<string>(null);
