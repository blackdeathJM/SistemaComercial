import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const CONTABILIDAD: FuseNavigationItem =
    {
        id: 'depto-contabilidad',
        title: 'Contabilidad',
        type: 'basic',
        icon: 'account_balance_wallet',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        link: dirAdmonFinanzas + 'contabilidad'
    };
