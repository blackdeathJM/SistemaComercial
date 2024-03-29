import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export enum GuardRecursosHumanos
{
    deptos = 'departamentos',
    infoGralEmpleados = 'infoGralEmpleados',
    imss = 'imss',
    nomina = 'nomina',
    entradasSalidasRetardos = 'entradasSalidasRetardos',
    fondoDeAhoro = 'fondoDeAhoro',
    prestamos = 'prestamos',
    recursosHumanos = 'recursosHumanos',
    puesto = 'puesto',
    concentrado = 'concentrado'
}

export enum CtrlRecursosHumanos
{
    agregarNvoEmpleado = 'agregarNvo',
    editarInfo = 'editarInfo'
}

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
                    controles:
                        [
                            {
                                id: CtrlRecursosHumanos.agregarNvoEmpleado,
                                title: 'Agregar nuevo empleado',
                                activo: false
                            },
                            {
                                id: CtrlRecursosHumanos.editarInfo,
                                title: 'Editar informacion empleado',
                                activo: false
                            }
                        ],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirAdmonFinanzas + 'empleados/info-general'
                },
                {
                    id: GuardRecursosHumanos.puesto,
                    title: 'Puesto',
                    type: 'basic',
                    icon: 'bento',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirAdmonFinanzas + 'empleados/puesto'
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
                    id: GuardRecursosHumanos.entradasSalidasRetardos,
                    title: 'Ctrl. Entradas salidas',
                    type: 'basic',
                    icon: 'rule',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirAdmonFinanzas + 'empleados/entradas-salidas'
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
                },
                {
                    id: GuardRecursosHumanos.concentrado,
                    title: 'Concentrado',
                    type: 'basic',
                    icon: 'heroicons_outline:user-group',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirAdmonFinanzas + 'empleados/concentrado'
                }
            ]
    };
