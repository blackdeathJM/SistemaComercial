import {FuseNavigationItem} from '@s-fuse/navigation';

export const INGRESOS: FuseNavigationItem =
    {
        id: 'depto-ingresos',
        title: 'Ingresos',
        type: 'collapsable',
        icon: 'attach_money',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children: []
    };
