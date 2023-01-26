import {FuseNavigationItem} from '@s-fuse/navigation';

export const OPERACIONES: FuseNavigationItem =
    {
        id: 'operaciones',
        title: 'Operaciones',
        type: 'basic',
        icon: 'blur_linear',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
    };
