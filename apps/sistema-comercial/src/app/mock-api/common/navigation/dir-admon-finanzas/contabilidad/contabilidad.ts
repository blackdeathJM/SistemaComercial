import {FuseNavigationItem} from '@s-fuse/navigation';
import {CTRL_PATRIMONIAL} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/contabilidad/control-patrimonial/control-patrimonial';

export const CONTABILIDAD: FuseNavigationItem =
    {
        id: 'depto-contabilidad',
        title: 'Contabilidad',
        type: 'collapsable',
        icon: 'contabilidad',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children: [CTRL_PATRIMONIAL]
    };
