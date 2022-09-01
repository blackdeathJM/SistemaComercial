import {IRol} from "@sistema-comercial/modelos/auth.interface";

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
