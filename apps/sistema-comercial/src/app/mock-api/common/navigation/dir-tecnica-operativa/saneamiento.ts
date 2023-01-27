import {FuseNavigationItem} from '@s-fuse/navigation';

export const SANEAMIENTO: FuseNavigationItem =
    {
        id: 'depto-saneamiento',
        title: 'Saneamiento',
        type: 'basic',
        icon: 'adjust',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true
    };
