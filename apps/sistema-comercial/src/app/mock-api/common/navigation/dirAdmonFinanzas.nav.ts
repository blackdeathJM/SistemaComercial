import {FuseNavigationItem} from "@s-fuse/navigation";

export const DIR_ADMON_FINANZAS: FuseNavigationItem[] =
    [
        {
            id: 'dirAdmonFinanzas',
            title: 'DIR ADMON FINANZAS',
            type: 'group',
            icon: 'work',
            children:
                [
                    {
                        id: 'rhh',
                        title: 'Recursos humanos',
                        type: 'basic',
                        icon: 'people'
                    },
                    {
                        id: 'contabilidad',
                        title: 'Contabilidad',
                        type: 'basic',
                        icon: 'account_balance_wallet'
                    },
                    {
                        id: 'comprasServicios',
                        title: 'Compras y servicios',
                        type: 'basic',
                        icon: 'double_arrow'
                    },
                    {
                        id: 'egresos',
                        title: 'Egresos',
                        type: 'basic',
                        icon: 'price_change'
                    },
                    {
                        id: 'almacen',
                        title: 'Almacen',
                        type: 'basic',
                        icon: 'margin'
                    }
                ]
        }
    ];

export const DIR_ADMON_FINANZAS_C: FuseNavigationItem[] = [];
export const DIR_ADMON_FINANZAS_F: FuseNavigationItem[] = [];
export const DIR_ADMON_FINANZAS_H: FuseNavigationItem[] = [];
