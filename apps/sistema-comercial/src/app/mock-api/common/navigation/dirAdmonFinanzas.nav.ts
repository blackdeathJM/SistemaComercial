import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '@s-app/common/navigation/constantes/rutas';

export const DIR_ADMON_FINANZAS: FuseNavigationItem[] =
    [
        {
            id: 'dirAdmonFinanzas',
            title: 'DIR. ADMON FINANZAS',
            type: 'group',
            icon: 'work',
            children:
                [
                    {
                        id: 'rhh',
                        title: 'Recursos humanos',
                        type: 'collapsable',
                        icon: 'people',
                        children:
                            [
                                {
                                    id: 'empleados',
                                    title: 'Empleados',
                                    type: 'basic',
                                    icon: 'people',
                                    link: dirAdmonFinanzas + 'recursos-humanos/' + 'empleados'
                                }
                            ]
                    },
                    {
                        id: 'contabilidad',
                        title: 'Contabilidad',
                        type: 'basic',
                        icon: 'account_balance_wallet',
                        link: dirAdmonFinanzas + 'contabilidad'
                    },
                    {
                        id: 'comprasServicios',
                        title: 'Compras y servicios',
                        type: 'basic',
                        icon: 'double_arrow',
                        link: dirAdmonFinanzas + 'compras-servicios'
                    },
                    {
                        id: 'egresos',
                        title: 'Egresos',
                        type: 'basic',
                        icon: 'price_change',
                        link: dirAdmonFinanzas + 'egresos'
                    },
                    {
                        id: 'almacen',
                        title: 'Almacen',
                        type: 'basic',
                        icon: 'margin',
                        link: dirAdmonFinanzas + 'almacen'
                    }
                ]
        }
    ];

export const DIR_ADMON_FINANZAS_C: FuseNavigationItem[] = [];
export const DIR_ADMON_FINANZAS_F: FuseNavigationItem[] = [];
export const DIR_ADMON_FINANZAS_H: FuseNavigationItem[] = [];
