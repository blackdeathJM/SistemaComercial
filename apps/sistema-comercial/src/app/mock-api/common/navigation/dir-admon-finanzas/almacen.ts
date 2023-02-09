import {FuseNavigationItem} from '@s-fuse/navigation';

export const GUARD_ALMACEN = 'depto-almacen';
export const ALMACEN: FuseNavigationItem =
    {
        id: GUARD_ALMACEN,
        title: 'Almacen',
        type: 'collapsable',
        icon: 'margin',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children: []
    };
