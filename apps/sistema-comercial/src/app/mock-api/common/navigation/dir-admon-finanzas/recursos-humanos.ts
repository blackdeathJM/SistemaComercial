import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const RECURSOS_HUMANOS: FuseNavigationItem =
    {
        id: 'rhh',
        title: 'Recursos humanos',
        type: 'collapsable',
        icon: 'people',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
        children:
            [
                {
                    id: 'departamentos',
                    title: 'Departamentos',
                    type: 'basic',
                    icon: 'bento',
                    activo: false,
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    active: false,
                    link: dirAdmonFinanzas + 'departamentos'
                },
                {
                    id: 'empleados',
                    title: 'Info. gral empleados',
                    type: 'basic',
                    icon: 'badge',
                    activo: false,
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    active: false,
                    link: dirAdmonFinanzas + 'empleados/info-general'
                },
                {
                    id: 'imss',
                    title: 'Imss',
                    type: 'basic',
                    icon: 'featured_play_list',
                    activo: false,
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    active: false,
                    link: dirAdmonFinanzas + 'empleados/imss'
                },
                {
                    id: 'nomina',
                    title: 'Nomina',
                    type: 'basic',
                    icon: 'account_balance_wallet',
                    activo: false,
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    active: false,
                    link: dirAdmonFinanzas + 'empleados/nomina'
                },
                {
                    id: 'retardos',
                    title: 'Retardos',
                    type: 'basic',
                    icon: 'rule',
                    activo: false,
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    active: false,
                    link: dirAdmonFinanzas + 'empleados/retardos'
                },
                {
                    id: 'fondoDeAhoro',
                    title: 'Fondo de ahorro',
                    type: 'basic',
                    icon: 'savings',
                    activo: false,
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    active: false,
                    link: dirAdmonFinanzas + 'empleados/fondo-de-ahorro'
                },
                {
                    id: 'fondoDeAhoro',
                    title: 'Prestamos',
                    type: 'basic',
                    icon: 'paid',
                    activo: false,
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    active: false,
                    link: dirAdmonFinanzas + 'empleados/prestamos'
                }
            ]
    };
