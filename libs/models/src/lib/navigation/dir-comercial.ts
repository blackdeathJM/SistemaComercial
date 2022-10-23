import {FuseNavigationItem} from 'apps/sistema-comercial/src/@fuse/components/navigation';

export const DIR_COMERCIAL: FuseNavigationItem[] =
    [
        {
            id: 'dirComercial',
            title: ' DIR. COMERCIAL',
            type: 'group',
            icon: 'heroicons_outline:library',
            children:
                [
                    {
                        id: 'informaticaFacturacion',
                        title: 'Informatica y facturacion',
                        type: 'basic',
                        icon: 'feather:monitor'
                    },
                    {
                        id: 'planeacion',
                        title: 'Planeacion',
                        type: 'basic',
                        icon: 'feather:calendar'
                    },
                    {
                        id: 'ingresos',
                        title: 'Ingresos',
                        type: 'basic',
                        icon: 'attach_money'
                    },
                    {
                        id: 'carteraVencida',
                        title: 'Cartera vencida',
                        type: 'basic',
                        icon: 'account_balance_wallet'
                    },
                    {
                        id: 'contratos',
                        title: 'Contratos',
                        type: 'basic',
                        icon: 'article'
                    }
                ]
        }
    ];
export const DIR_COMERCIAL_C: FuseNavigationItem[] = [];
export const DIR_COMERCIAL_F: FuseNavigationItem[] = [];
export const DIR_COMERCIAL_H: FuseNavigationItem[] = [];
