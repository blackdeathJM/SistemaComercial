import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const EGRESOS: FuseNavigationItem =
    {
        id: 'depto-egresos',
        title: 'Egresos',
        type: 'basic',
        icon: 'price_change',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        acceso: true,
        link: dirAdmonFinanzas + 'egresos'
    };
