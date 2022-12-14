import { IDatosSesion } from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {makeVar, ReactiveVar} from '@apollo/client';

export const STATE_DATOS_SESION: ReactiveVar<IDatosSesion> = makeVar<IDatosSesion>(null);

export const STATE_AUTENTICADO: ReactiveVar<boolean> = makeVar<boolean>(false);
