import {makeVar, ReactiveVar} from '@apollo/client';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';

// export const STATE_DEPTOS: ReactiveVar<ApolloQueryResult<DepartamentosQuery> | SingleExecutionResult<CrearDeptoMutation> | MutationResult<ActualizarDeptoMutation>> =
//     makeVar<ApolloQueryResult<DepartamentosQuery> | SingleExecutionResult<CrearDeptoMutation> | MutationResult<ActualizarDeptoMutation>>(null);

export const STATE_DEPTOS: ReactiveVar<IDepto[]> = makeVar<IDepto[]>([]);
