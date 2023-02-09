import {FuseNavigationItem} from '@s-fuse/navigation';
import {rutaGeneral} from '../constantes/rutas';

export enum GuardsGeneral
{
    general = 'general',
    documentos = 'documentos',
    misResguardos = 'misResguardos',
    ordenesAtencion = 'ordenesDeAtencion'
}

export enum CtrlsGeneral
{
    agregarNvoDoc = 'agregarNvoDoc'
}

export const GENERAL: FuseNavigationItem[] =
    [
        {
            id: GuardsGeneral.general,
            title: 'GENERAL',
            type: 'group',
            icon: '6_ft_apart',
            oculto: false,
            hidden: (item: FuseNavigationItem): boolean => item.oculto,
            badge: {},
            controles: [],
            disabled: false,
            puedeAsigPermisos: false,
            acceso: true,
            children:
                [
                    {
                        id: GuardsGeneral.documentos,
                        title: 'Mis documentos',
                        type: 'basic',
                        icon: 'feather:folder',
                        oculto: false,
                        hidden: (item: FuseNavigationItem): boolean => item.oculto,
                        badge: {},
                        controles:
                            [
                                {
                                    id: CtrlsGeneral.agregarNvoDoc,
                                    title: 'Agregar nvo documento',
                                    activo: false
                                }
                            ],
                        disabled: false,
                        puedeAsigPermisos: false,
                        acceso: false,
                        link: rutaGeneral + 'mis-documentos'
                    },
                    {
                        id: GuardsGeneral.misResguardos,
                        title: 'Mis resguardos',
                        type: 'basic',
                        icon: 'feather:archive',
                        oculto: false,
                        hidden: (item: FuseNavigationItem): boolean => item.oculto,
                        badge: {},
                        controles: [],
                        disabled: false,
                        puedeAsigPermisos: false,
                        acceso: false,
                        link: rutaGeneral + 'mis-resguardos'
                    },
                    {
                        id: GuardsGeneral.ordenesAtencion,
                        title: 'Ordenes de atencion',
                        type: 'basic',
                        icon: 'feather:file-text',
                        oculto: false,
                        hidden: (item: FuseNavigationItem): boolean => item.oculto,
                        badge: {},
                        controles: [],
                        disabled: false,
                        puedeAsigPermisos: false,
                        acceso: false,
                        link: rutaGeneral + 'ordenes-atencion'
                    },
                    {
                        id: 'sesionEmpleados',
                        title: 'Permisos',
                        type: 'basic',
                        icon: 'admin_panel_settings',
                        oculto: false,
                        hidden: (item: FuseNavigationItem): boolean => item.oculto,
                        badge: {},
                        controles: [],
                        disabled: false,
                        puedeAsigPermisos: false,
                        acceso: false,
                        link: rutaGeneral + 'permisos'
                    }
                ]
        }
    ];

export const GENERAL_C: FuseNavigationItem[] = [];
export const GENERAL_F: FuseNavigationItem[] = [];
export const GENERAL_H: FuseNavigationItem[] = [];
