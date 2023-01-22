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
                        badge: {},
                        controles: [],
                        disabled: false,
                        children:
                            [
                                {
                                    id: 'empleados',
                                    title: 'Info. gral empleados',
                                    type: 'basic',
                                    icon: 'badge',
                                    badge: {},
                                    controles: [],
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/info-general'
                                },
                                {
                                    id: 'imss',
                                    title: 'Imss',
                                    type: 'basic',
                                    icon: 'featured_play_list',
                                    badge: {},
                                    controles: [],
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/imss'
                                },
                                {
                                    id: 'nomina',
                                    title: 'Nomina',
                                    type: 'basic',
                                    icon: 'account_balance_wallet',
                                    badge: {},
                                    controles: [],
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/nomina'
                                },
                                {
                                    id: 'retardos',
                                    title: 'Retardos',
                                    type: 'basic',
                                    icon: 'rule',
                                    badge: {},
                                    controles: [],
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/retardos'
                                },
                                {
                                    id: 'fondoDeAhoro',
                                    title: 'Fondo de ahorro',
                                    type: 'basic',
                                    icon: 'savings',
                                    badge: {},
                                    controles: [],
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/fondo-de-ahorro'
                                },
                                {
                                    id: 'fondoDeAhoro',
                                    title: 'Prestamos',
                                    type: 'basic',
                                    icon: 'paid',
                                    badge: {},
                                    controles: [],
                                    activo: false,
                                    disabled: false,
                                    link: dirAdmonFinanzas + 'empleados/prestamos'
                                }
                            ]
                    },
                    {
                        id: 'contabilidad',
                        title: 'Contabilidad',
                        type: 'basic',
                        icon: 'account_balance_wallet',
                        badge: {},
                        controles: [],
                        activo: false,
                        disabled: false,
                        link: dirAdmonFinanzas + 'contabilidad'
                    },
                    {
                        id: 'comprasServicios',
                        title: 'Compras y servicios',
                        type: 'basic',
                        icon: 'double_arrow',
                        badge: {},
                        controles: [],
                        activo: false,
                        disabled: false,
                        link: dirAdmonFinanzas + 'compras-servicios'
                    },
                    {
                        id: 'egresos',
                        title: 'Egresos',
                        type: 'basic',
                        icon: 'price_change',
                        badge: {},
                        controles: [],
                        activo: false,
                        disabled: false,
                        link: dirAdmonFinanzas + 'egresos'
                    },
                    {
                        id: 'almacen',
                        title: 'Almacen',
                        type: 'basic',
                        icon: 'margin',
                        badge: {},
                        controles: [],
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
