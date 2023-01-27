import {FuseNavigationItem} from '@s-fuse/navigation';

export const REGULACION: FuseNavigationItem =
    {
        id: 'depto-regulacion',
        title: 'Regulacion',
        type: 'basic',
        icon: 'heroicons_outline:collection',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
    };
