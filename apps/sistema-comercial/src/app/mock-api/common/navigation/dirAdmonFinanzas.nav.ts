import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from './constantes/rutas';

export const DIR_ADMON_FINANZAS: FuseNavigationItem[] =
    [
        {
            id: 'dirAdmonFinanzas',
            title: 'DIR. ADMON FINANZAS',
            type: 'group',
            icon: 'work',
            activo: false,
            disabled: false,
            children:
                [
                    {
                        id: 'rhh',
                        title: 'Recursos humanos',
                        type: 'collapsable',
                        icon: 'people',
                        activo: false,
                        disabled: false,
                        children:
                            [
                                {
                                    id: 'empleados',
                                    title: 'Info. gral empleados',
                                    type: 'basic',
                                    icon: 'badge',
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/info-general'
                                },
                                {
                                    id: 'imss',
                                    title: 'Imss',
                                    type: 'basic',
                                    icon: 'featured_play_list',
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/imss'
                                },
                                {
                                    id: 'nomina',
                                    title: 'Nomina',
                                    type: 'basic',
                                    icon: 'account_balance_wallet',
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/nomina'
                                },
                                {
                                    id: 'retardos',
                                    title: 'Retardos',
                                    type: 'basic',
                                    icon: 'rule',
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/retardos'
                                },
                                {
                                    id: 'cuotas',
                                    title: 'Cuotas',
                                    type: 'basic',
                                    icon: 'money',
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/cuotas'
                                },
                                {
                                    id: 'fondoDeAhoro',
                                    title: 'Fondo de ahorro',
                                    type: 'basic',
                                    icon: 'savings',
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/fondo-de-ahorro'
                                }
                            ]
                    },
                    {
                        id: 'contabilidad',
                        title: 'Contabilidad',
                        type: 'basic',
                        icon: 'account_balance_wallet',
                        activo: false,
                        disabled: false,
                        link: dirAdmonFinanzas + 'contabilidad'
                    },
                    {
                        id: 'comprasServicios',
                        title: 'Compras y servicios',
                        type: 'basic',
                        icon: 'double_arrow',
                        activo: false,
                        disabled: false,
                        link: dirAdmonFinanzas + 'compras-servicios'
                    },
                    {
                        id: 'egresos',
                        title: 'Egresos',
                        type: 'basic',
                        icon: 'price_change',
                        activo: false,
                        disabled: false,
                        link: dirAdmonFinanzas + 'egresos'
                    },
                    {
                        id: 'almacen',
                        title: 'Almacen',
                        type: 'basic',
                        icon: 'margin',
                        activo: false,
                        disabled: false,
                        link: dirAdmonFinanzas + 'almacen'
                    }
                ]
        }
    ];

export const DIR_ADMON_FINANZAS_C: FuseNavigationItem[] = [];
export const DIR_ADMON_FINANZAS_F: FuseNavigationItem[] = [];
export const DIR_ADMON_FINANZAS_H: FuseNavigationItem[] = [];
