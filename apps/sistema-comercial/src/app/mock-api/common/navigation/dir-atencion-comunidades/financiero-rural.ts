import {FuseNavigationItem} from '@s-fuse/navigation';
export const FINANCIERO_RURAL: FuseNavigationItem =
    {
        id: 'financieroRural',
        title: 'Financiero Rural',
        type: 'basic',
        icon: 'heroicons_outline:cash',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
    };
