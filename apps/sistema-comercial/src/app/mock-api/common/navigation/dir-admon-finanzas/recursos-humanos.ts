import {FuseNavigationItem, IControl} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export enum GuardRecursosHumanos
{
    deptos = 'departamentos',
    infoGralEmpleados = 'infoGralEmpleados',
    imss = 'imss',
    nomina = 'nomina',
    retardos = 'retardos',
    fondoDeAhoro = 'fondoDeAhoro',
    prestamos = 'prestamos',
    recursosHumanos = 'recursosHumanos'
}

export const ctrlsRecursosHumanosAgregarNvoEmpleado: IControl =
    {
        id: 'btnAgregarNvoEmpleado',
        title: 'Agregar Empleado',
        activo: true
    };
export const RECURSOS_HUMANOS: FuseNavigationItem =
    {
        id: GuardRecursosHumanos.recursosHumanos,
        title: 'Recursos humanos',
        type: 'collapsable',
        icon: 'people',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        acceso: true,
        children:
            [
                {
                    id: GuardRecursosHumanos.deptos,
                    title: 'Departamentos',
                    type: 'basic',
                    icon: 'bento',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirAdmonFinanzas + 'departamentos'
                },
                {
                    id: GuardRecursosHumanos.infoGralEmpleados,
                    title: 'Info. gral empleados',
                    type: 'basic',
                    icon: 'badge',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirAdmonFinanzas + 'empleados/info-general'
                },
                {
                    id: GuardRecursosHumanos.imss,
                    title: 'Imss',
                    type: 'basic',
                    icon: 'featured_play_list',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirAdmonFinanzas + 'empleados/imss'
                },
                {
                    id: GuardRecursosHumanos.nomina,
                    title: 'Nomina',
                    type: 'basic',
                    icon: 'account_balance_wallet',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirAdmonFinanzas + 'empleados/nomina'
                },
                {
                    id: GuardRecursosHumanos.retardos,
                    title: 'Retardos',
                    type: 'basic',
                    icon: 'rule',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirAdmonFinanzas + 'empleados/retardos'
                },
                {
                    id: GuardRecursosHumanos.fondoDeAhoro,
                    title: 'Fondo de ahorro',
                    type: 'basic',
                    icon: 'savings',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirAdmonFinanzas + 'empleados/fondo-de-ahorro'
                },
                {
                    id: GuardRecursosHumanos.prestamos,
                    title: 'Prestamos',
                    type: 'basic',
                    icon: 'paid',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirAdmonFinanzas + 'empleados/prestamos'
                }
            ]
    };
