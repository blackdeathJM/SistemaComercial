import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const CONTABILIDAD: FuseNavigationItem =
    {
        id: 'contabilidad',
        title: 'Contabilidad',
        type: 'basic',
        icon: 'account_balance_wallet',
        badge: {},
        controles: [],
        activo: false,
        disabled: false,
        link: dirAdmonFinanzas + 'contabilidad'
    };
