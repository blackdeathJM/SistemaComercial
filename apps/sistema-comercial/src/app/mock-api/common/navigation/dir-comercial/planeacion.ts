import {FuseNavigationItem} from '@s-fuse/navigation';

export const PLANEACION: FuseNavigationItem =
    {
        id: 'planeacion',
        title: 'Planeacion',
        type: 'basic',
        icon: 'feather:calendar',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
    };
