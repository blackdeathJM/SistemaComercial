import {FuseNavigationItem} from '@s-fuse/navigation';

export const OPERACIONES: FuseNavigationItem =
    {
        id: 'depto-operaciones',
        title: 'Operaciones',
        type: 'basic',
        icon: 'blur_linear',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        acceso: true
    };
