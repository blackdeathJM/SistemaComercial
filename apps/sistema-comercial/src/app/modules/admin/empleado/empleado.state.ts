import {makeVar, ReactiveVar} from '@apollo/client';
import {IEmpleado} from '#/libs/models/src';

export const STATE_EMPLEADOS: ReactiveVar<IEmpleado[]> = makeVar<IEmpleado[]>([]);
