import {FuseNavigationItem} from '@s-fuse/navigation';

export const OPERACIONES: FuseNavigationItem =
    {
        id: 'depto-operaciones',
        title: 'Operaciones',
        type: 'collapsable',
        icon: 'blur_linear',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children: []
    };
