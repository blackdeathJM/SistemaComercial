import {makeVar, ReactiveVar} from '@apollo/client';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth.interface';

export const STATE_DATOS_SESION: ReactiveVar<IDatosSesion> = makeVar<IDatosSesion>(null);
