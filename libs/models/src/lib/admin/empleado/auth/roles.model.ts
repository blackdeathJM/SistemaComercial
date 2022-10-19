import {IRoles} from "../auth/auth.interface";

export const ROLES: IRoles[] =
    [
        {
            id: 'administrador',
            titulo: 'ADMINISTRADOR',
            tipoAcceso: 'ninguno',
            oculto: false,
            hijos:
            [
                {
                    id: 'adminGral',
                    titulo: 'Admin Gral',
                    tipoAcceso: 'ninguno',
                    oculto: false,
                }
            ]
        },
        {
            id: 'dirAdmonFinanzas',
            titulo: 'DIR. ADMON Y FINANZAS',
            tipoAcceso: 'ninguno',
            oculto: false,
            hijos:
                [
                    {
                        id: 'rhh',
                        titulo: 'Recursos humanos',
                        tipoAcceso: 'ninguno',
                        oculto: false,
                    },
                    {
                        id: 'contabilidad',
                        titulo: 'Contabilidad',
                        tipoAcceso: 'ninguno',
                        oculto: false
                    }
                ]
        },
        {
            id: 'dirComercial',
            titulo: 'DIR. COMERCIAL',
            tipoAcceso: 'ninguno',
            oculto: false,
            hijos:
                [
                    {
                        id: 'informaticaFacturacion',
                        titulo: 'Informatica y facturacion',
                        tipoAcceso: 'ninguno',
                        oculto: false
                    }
                ]
        },
        {
            id: 'dirTecnicaOperativa',
            titulo: 'DIR. TECNICA OPERATIVA',
            tipoAcceso: 'ninguno',
            oculto: false,
            hijos:
                [
                    {
                        id: 'saneamiento',
                        titulo: 'Saneamiento',
                        tipoAcceso: 'ninguno',
                        oculto: false
                    }
                ]
        },
        {
            id: 'dirAtencionComunidades',
            titulo: 'DIR. ATENCION A COMUNIDADES',
            tipoAcceso: 'ninguno',
            oculto: false,
            hijos:
                [
                    {
                        id: 'operativaRural',
                        titulo: 'Operativo rural',
                        tipoAcceso: 'ninguno',
                        oculto: false
                    }
                ]
        },
        {
            id: 'dirArchivoGralRegulacion',
            titulo: 'DIR. ARCHIVO GRAL Y REG',
            tipoAcceso: 'ninguno',
            oculto: false
        }
    ];


