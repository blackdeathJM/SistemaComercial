import {IRol} from '#api/libs/models/src/lib/admin/empleado/auth/auth.interface';

export const ROLES_POR_DEFECTO: IRol[] =
    [
        {
            id: 'Administrador',
            tipoAcceso: 'ninguno',
            oculto: true
        },
        {
            id: 'Telemetria',
            tipoAcceso: 'ninguno',
            oculto: true
        }
    ];
