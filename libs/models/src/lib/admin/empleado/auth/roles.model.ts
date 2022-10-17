import {IRoles} from "../auth/auth.interface";

export const ROLES: IRoles[] =
    [
        {
            id: 'presidencia',
            titulo: 'Presidencia',
            centroGestor: 'PRE',
            tipoAcceso: 'ninguno',
            oculto: false,


        },
        {
            id: 'dirAdmonFinanzas',
            titulo: 'DIR. ADMON Y FINANZAS',
            centroGestor: 'DAF',
            tipoAcceso: 'ninguno',
            oculto: false,
            hijos:
                [
                    {
                        id: 'rhh',
                        titulo: 'Recursos humanos',
                        centroGestor: 'RHH',
                        tipoAcceso: 'ninguno',
                        oculto: false,
                    },
                    {
                        id: 'contabilidad',
                        titulo: 'Contabilidad',
                        centroGestor: 'CON',
                        tipoAcceso: 'ninguno',
                        oculto: false
                    }
                ]
        },
        {
            id: 'dirComercial',
            titulo: 'DIR. COMERCIAL',
            centroGestor: 'DIC',
            tipoAcceso: 'ninguno',
            oculto: false,
            hijos:
                [
                    {
                        id: 'informaticaFacturacion',
                        titulo: 'Informatica y facturacion',
                        centroGestor: 'INF',
                        tipoAcceso: 'ninguno',
                        oculto: false
                    }
                ]
        },
        {
            id: 'dirTecnicaOperativa',
            titulo: 'DIR. TECNICA OPERATIVA',
            centroGestor: 'DTO',
            tipoAcceso: 'ninguno',
            oculto: false,
            hijos:
                [
                    {
                        id: 'saneamiento',
                        titulo: 'Saneamiento',
                        centroGestor: 'SAN',
                        tipoAcceso: 'ninguno',
                        oculto: false
                    }
                ]
        },
        {
            id: 'dirAtencionComunidades',
            titulo: 'DIR. ATENCION A COMUNIDADES',
            centroGestor: 'DAC',
            tipoAcceso: 'ninguno',
            oculto: false,
            hijos:
                [
                    {
                        id: 'operativaRural',
                        titulo: 'Operativo rural',
                        centroGestor: 'OPR',
                        tipoAcceso: 'ninguno',
                        oculto: false
                    }
                ]
        },
        {
            id: 'dirArchivoGralRegulacion',
            titulo: 'DIR. ARCHIVO GRAL Y REG',
            centroGestor: 'DAGR',
            tipoAcceso: 'ninguno',
            oculto: false
        }
    ];


