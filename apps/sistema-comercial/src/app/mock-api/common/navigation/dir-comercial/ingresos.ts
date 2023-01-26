import {FuseNavigationItem} from '@s-fuse/navigation';

export const INGRESOS: FuseNavigationItem =
    {
        id: 'ingresos',
        title: 'Ingresos',
        type: 'basic',
        icon: 'attach_money',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
    };
