import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const COMPRAS_SERVICIOS: FuseNavigationItem =
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
    };
