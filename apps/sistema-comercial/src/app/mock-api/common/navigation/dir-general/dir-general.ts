import {FuseNavigationItem} from '@s-fuse/navigation';
import {PLANEACION} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-general/planeacion';

export const DIR_GRAL: FuseNavigationItem[] =
    [
        {
            id: 'depto-dirComercial',
            title: ' DIR. GENERAL',
            type: 'group',
            icon: 'mat_solid:account_tree',
            oculto: false,
            hidden: (item: FuseNavigationItem): boolean => item.oculto,
            badge: {},
            controles: [],
            disabled: false,
            puedeAsigPermisos: true,
            acceso: true,
            children: [PLANEACION]
        }
    ];
export const DIR_GRAL_C: FuseNavigationItem[] = [];
export const DIR_GRAL_F: FuseNavigationItem[] = [];
export const DIR_GRAL_H: FuseNavigationItem[] = [];
