import {FuseNavigationItem} from '@s-fuse/navigation';

export const CONTRATOS: FuseNavigationItem =
    {
        id: 'contratos',
        title: 'Contratos',
        type: 'basic',
        icon: 'article',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
    };
