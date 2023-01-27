import {FuseNavigationItem} from '@s-fuse/navigation';

export const INGRESOS: FuseNavigationItem =
    {
        id: 'depto-ingresos',
        title: 'Ingresos',
        type: 'basic',
        icon: 'attach_money',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        acceso: true,
    };
