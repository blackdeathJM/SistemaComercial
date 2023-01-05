import {makeVar, ReactiveVar} from '@apollo/client';

export const STATE_ABRIR_CERRAR_PANEL: ReactiveVar<boolean> = makeVar<boolean>(false);
