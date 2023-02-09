import {FuseNavigationItem} from '@s-fuse/navigation';

export const CARTERA_VENCIDA: FuseNavigationItem =
    {

        id: 'depto-carteraVencida',
        title: 'Cartera vencida',
        type: 'collapsable',
        icon: 'account_balance_wallet',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children: []
    };
