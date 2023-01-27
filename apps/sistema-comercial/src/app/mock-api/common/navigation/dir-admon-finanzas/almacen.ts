import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const ALMACEN: FuseNavigationItem =
    {
        id: 'depto-almacen',
        title: 'Almacen',
        type: 'basic',
        icon: 'margin',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        link: dirAdmonFinanzas + 'almacen'
    };
