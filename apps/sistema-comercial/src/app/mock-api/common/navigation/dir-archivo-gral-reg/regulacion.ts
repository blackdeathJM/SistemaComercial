import {FuseNavigationItem} from '@s-fuse/navigation';

export const REGULACION: FuseNavigationItem =
    {
        id: 'regulacion',
        title: 'Regulacion',
        type: 'basic',
        icon: 'heroicons_outline:collection',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
    };
