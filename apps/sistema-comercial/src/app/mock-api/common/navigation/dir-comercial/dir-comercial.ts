import {FuseNavigationItem} from '@s-fuse/navigation';
import {INFORMATICAFACTURACION} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-comercial/informatica-facturacion';
import {PLANEACION} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-comercial/planeacion';
import {INGRESOS} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-comercial/ingresos';
import {CARTERA_VENCIDA} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-comercial/cartera-vencida';
import {CONTRATOS} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-comercial/contratos';

export const DIR_COMERCIAL: FuseNavigationItem[] =
    [
        {
            id: 'depto-dirComercial',
            title: ' DIR. COMERCIAL',
            type: 'group',
            icon: 'heroicons_outline:library',
            oculto: false,
            hidden: (item: FuseNavigationItem): boolean => item.oculto,
            badge: {},
            controles: [],
            disabled: false,
            puedeAsigPermisos: true,
            acceso: true,
            children: [INFORMATICAFACTURACION, PLANEACION, INGRESOS, CARTERA_VENCIDA, CONTRATOS]
        }
    ];
export const DIR_COMERCIAL_C: FuseNavigationItem[] = [];
export const DIR_COMERCIAL_F: FuseNavigationItem[] = [];
export const DIR_COMERCIAL_H: FuseNavigationItem[] = [];
