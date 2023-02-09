import {FuseNavigationItem} from '@s-fuse/navigation';

export const EGRESOS: FuseNavigationItem =
    {
        id: 'depto-egresos',
        title: 'Egresos',
        type: 'collapsable',
        icon: 'price_change',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children: []
    };
