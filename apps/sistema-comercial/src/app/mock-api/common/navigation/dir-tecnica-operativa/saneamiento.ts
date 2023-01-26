import {FuseNavigationItem} from '@s-fuse/navigation';

export const SANEAMIENTO: FuseNavigationItem =
    {
        id: 'saneamiento',
        title: 'Saneamiento',
        type: 'basic',
        icon: 'adjust',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
    };
