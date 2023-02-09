import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const COMPRAS_SERVICIOS: FuseNavigationItem =
    {
        id: 'depto-comprasServicios',
        title: 'Compras y servicios',
        type: 'collapsable',
        icon: 'double_arrow',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children: []
    };
