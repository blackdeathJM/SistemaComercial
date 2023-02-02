import {FuseNavigationItem} from '@s-fuse/navigation';

export const LEGAL_RURAL: FuseNavigationItem =
    {
        id: 'depto-legalRural',
        title: 'Legal Rural',
        type: 'collapsable',
        icon: 'assignment_late',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children: []
    };
