import {FuseNavigationItem} from '@s-fuse/navigation';

export const DIR_COMERCIAL: FuseNavigationItem[] =
    [
        {
            id: 'dirComercial',
            title: ' DIR. COMERCIAL',
            type: 'group',
            icon: 'heroicons_outline:library',
            activo: false,
            disabled: false,
            children:
                [
                    {
                        id: 'informaticaFacturacion',
                        title: 'Informatica y facturacion',
                        type: 'basic',
                        icon: 'feather:monitor',
                        activo: false,
                        disabled: false,
                    },
                    {
                        id: 'planeacion',
                        title: 'Planeacion',
                        type: 'basic',
                        icon: 'feather:calendar',
                        activo: false,
                        disabled: false,
                    },
                    {
                        id: 'ingresos',
                        title: 'Ingresos',
                        type: 'basic',
                        icon: 'attach_money',
                        activo: false,
                        disabled: false,
                    },
                    {
                        id: 'carteraVencida',
                        title: 'Cartera vencida',
                        type: 'basic',
                        icon: 'account_balance_wallet',
                        activo: false,
                        disabled: false,
                    },
                    {
                        id: 'contratos',
                        title: 'Contratos',
                        type: 'basic',
                        icon: 'article',
                        activo: false,
                        disabled: false,
                    }
                ]
        }
    ];
export const DIR_COMERCIAL_C: FuseNavigationItem[] = [];
export const DIR_COMERCIAL_F: FuseNavigationItem[] = [];
export const DIR_COMERCIAL_H: FuseNavigationItem[] = [];
