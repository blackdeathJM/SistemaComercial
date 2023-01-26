import {FuseNavigationItem} from '@s-fuse/navigation';

export const OPERATIVO_RURAL: FuseNavigationItem =
    {
        id: 'operativoRural',
        title: 'Operativo rural',
        type: 'basic',
        icon: 'agriculture',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
    };
