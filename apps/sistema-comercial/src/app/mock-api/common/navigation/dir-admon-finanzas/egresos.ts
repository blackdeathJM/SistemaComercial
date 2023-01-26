import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const EGRESOS: FuseNavigationItem =
    {
        id: 'egresos',
        title: 'Egresos',
        type: 'basic',
        icon: 'price_change',
        badge: {},
        controles: [],
        activo: false,
        disabled: false,
        link: dirAdmonFinanzas + 'egresos'
    };
