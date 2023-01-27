import {FuseNavigationItem} from '@s-fuse/navigation';

export const CONTRATOS: FuseNavigationItem =
    {
        id: 'depto-contratos',
        title: 'Contratos',
        type: 'basic',
        icon: 'article',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        acceso: true,
    };
