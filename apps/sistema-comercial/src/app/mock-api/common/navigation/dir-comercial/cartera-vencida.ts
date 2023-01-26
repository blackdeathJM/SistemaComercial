import {FuseNavigationItem} from '@s-fuse/navigation';

export const CARTERA_VENCIDA: FuseNavigationItem =
    {

        id: 'carteraVencida',
        title: 'Cartera vencida',
        type: 'basic',
        icon: 'account_balance_wallet',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,

    };
