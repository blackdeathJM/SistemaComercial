import {FuseNavigationItem} from '@s-fuse/navigation';
import {rutaGeneral} from '../constantes/rutas';

export const GENERAL: FuseNavigationItem[] =
    [
        {
            id: 'general',
            title: 'GENERAL',
            type: 'group',
            icon: '6_ft_apart',
            activo: false,
            disabled: false,
            children:
                [
                    {
                        id: 'documentos',
                        title: 'Mis documentos',
                        type: 'basic',
                        icon: 'feather:folder',
                        activo: false,
                        oculto: false,
                        hidden: (item: FuseNavigationItem): boolean => item.oculto,
                        badge: {},
                        controles: [],
                        disabled: false,
                        active: false,
                        link: rutaGeneral + 'mis-documentos'
                    },
                    {
                        id: 'misResguardos',
                        title: 'Mis resguardos',
                        type: 'basic',
                        icon: 'feather:archive',
                        activo: false,
                        oculto: false,
                        hidden: (item: FuseNavigationItem): boolean => item.oculto,
                        badge: {},
                        controles: [],
                        disabled: false,
                        active: false,
                        link: rutaGeneral + 'mis-resguardos'
                    },
                    {
                        id: 'ordenesDeAtencion',
                        title: 'Ordenes de atencion',
                        type: 'basic',
                        icon: 'feather:file-text',
                        activo: false,
                        oculto: false,
                        hidden: (item: FuseNavigationItem): boolean => item.oculto,
                        badge: {},
                        controles: [],
                        disabled: false,
                        active: false,
                        link: rutaGeneral + 'ordenes-atencion'
                    },
                    {
                        id: 'sesionEmpleados',
                        title: 'Permisos',
                        type: 'basic',
                        icon: 'admin_panel_settings',
                        activo: false,
                        oculto: false,
                        hidden: (item: FuseNavigationItem): boolean => item.oculto,
                        badge: {},
                        controles: [],
                        disabled: false,
                        active: false,
                        link: rutaGeneral + 'permisos'
                    }
                ]
        }
    ];

export const GENERAL_C: FuseNavigationItem[] = [];
export const GENERAL_F: FuseNavigationItem[] = [];
export const GENERAL_H: FuseNavigationItem[] = [];
