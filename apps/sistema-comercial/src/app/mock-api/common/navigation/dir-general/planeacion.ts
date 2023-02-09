import {FuseNavigationItem} from '@s-fuse/navigation';

export const PLANEACION: FuseNavigationItem =
    {
        id: 'depto-planeacion',
        title: 'Planeacion',
        type: 'collapsable',
        icon: 'feather:calendar',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        acceso: true
    };
