import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const RECURSOS_HUMANOS: FuseNavigationItem =
    {
        id: 'depto-recursos-humanos',
        title: 'Recursos humanos',
        type: 'collapsable',
        icon: 'people',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        children:
            [
                {
                    id: 'departamentos',
                    title: 'Departamentos',
                    type: 'basic',
                    icon: 'bento',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'departamentos'
                },
                {
                    id: 'empleados',
                    title: 'Info. gral empleados',
                    type: 'basic',
                    icon: 'badge',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/info-general'
                },
                {
                    id: 'imss',
                    title: 'Imss',
                    type: 'basic',
                    icon: 'featured_play_list',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/imss'
                },
                {
                    id: 'nomina',
                    title: 'Nomina',
                    type: 'basic',
                    icon: 'account_balance_wallet',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/nomina'
                },
                {
                    id: 'retardos',
                    title: 'Retardos',
                    type: 'basic',
                    icon: 'rule',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/retardos'
                },
                {
                    id: 'fondoDeAhoro',
                    title: 'Fondo de ahorro',
                    type: 'basic',
                    icon: 'savings',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/fondo-de-ahorro'
                },
                {
                    id: 'fondoDeAhoro',
                    title: 'Prestamos',
                    type: 'basic',
                    icon: 'paid',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/prestamos'
                }
            ]
    };
