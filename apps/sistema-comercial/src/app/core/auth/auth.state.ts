import {makeVar, ReactiveVar} from '@apollo/client';
import {IDatosSesion} from '#/libs/models/src';

const datosPrueba: IDatosSesion =
    {
        _id: '6302ba536f54202d153ab1d9', activo: false, auth:
            {
                activo: true,
                usuario: 'blackdeath',
                contrasena: '123',
                rol:
                    [
                        {
                            oculto: false,
                            tipoAcceso: 'lectura',
                            id: 'Adminitrador'
                        }
                    ]
            }, avatar: 'perfil.jpg', nombreCompleto: 'Jose Omar Carrillo Lopez'

    };

export const STATE_TOKEN: ReactiveVar<string> = makeVar<string>(null);

export const STATE_DATOS_SESIO: ReactiveVar<IDatosSesion> = makeVar<IDatosSesion>(datosPrueba);
