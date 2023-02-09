import {FuseNavigationItem} from '@s-fuse/navigation';

export const SANEAMIENTO: FuseNavigationItem =
    {
        id: 'depto-saneamiento',
        title: 'Saneamiento',
        type: 'collapsable',
        icon: 'adjust',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children: []
    };
