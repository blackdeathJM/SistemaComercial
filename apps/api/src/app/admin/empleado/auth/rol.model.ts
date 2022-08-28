import {IRol} from "@sistema-comercial/models";

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
