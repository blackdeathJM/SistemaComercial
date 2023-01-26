import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const ALMACEN: FuseNavigationItem =
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
    };
