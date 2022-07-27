import {makeVar, ReactiveVar} from '@apollo/client';


export const STATE_TOKEN: ReactiveVar<string> = makeVar<string>('sinToken');
// export const deptosState = (): void =>
// {
//     const deptos = useReactiveVar(STATE_DEPTOS);
// };

