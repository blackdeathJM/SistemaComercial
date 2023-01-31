import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const GUARD_ALMACEN = 'depto-almacen';
export const ALMACEN: FuseNavigationItem =
    {
        id: GUARD_ALMACEN,
        title: 'Almacen',
        type: 'basic',
        icon: 'margin',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        acceso: true,
        link: dirAdmonFinanzas + 'almacen'
    };
