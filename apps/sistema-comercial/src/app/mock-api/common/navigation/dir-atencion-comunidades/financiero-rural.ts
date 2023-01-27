import {FuseNavigationItem} from '@s-fuse/navigation';
export const FINANCIERO_RURAL: FuseNavigationItem =
    {
        id: 'depto-financieroRural',
        title: 'Financiero Rural',
        type: 'basic',
        icon: 'heroicons_outline:cash',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
    };
