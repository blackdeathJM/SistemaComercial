import {makeVar, ReactiveVar} from '@apollo/client';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';

// export const STATE_EMPLEADOS: ReactiveVar<Observable<IEmpleado[]>> = makeVar<Observable<IEmpleado[]>>(of([]));
export const STATE_EMPLEADOS: ReactiveVar<IResolveEmpleado[]> = makeVar<IResolveEmpleado[]>([]);
