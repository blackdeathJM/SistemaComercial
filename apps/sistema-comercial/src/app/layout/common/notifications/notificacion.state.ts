import {makeVar, ReactiveVar} from '@apollo/client';
import {INotificacion} from '#/libs/models/src/lib/general/notificacion/notificacion.interface';

export const STATE_NOTIFICACION: ReactiveVar<INotificacion[]> = makeVar<INotificacion[]>([]);
