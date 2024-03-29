import {FuseNavigationItem} from '@s-fuse/navigation';
import {CONTABILIDAD} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/contabilidad/contabilidad';
import {EGRESOS} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/egresos';
import {COMPRAS_SERVICIOS} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/compras-servicios';
import {ALMACEN} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/almacen';
import {RECURSOS_HUMANOS} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/recursos-humanos';

export const DIR_ADMON_FINANZAS: FuseNavigationItem[] =
    [
        {
            id: 'dir-admonFinanzas',
            title: 'DIR. ADMON FINANZAS',
            type: 'group',
            icon: 'work',
            oculto: false,
            hidden: (item: FuseNavigationItem): boolean => item.oculto,
            badge: {},
            controles: [],
            disabled: false,
            puedeAsigPermisos: false,
            acceso: false,
            children: [RECURSOS_HUMANOS, CONTABILIDAD, EGRESOS, COMPRAS_SERVICIOS, ALMACEN]
        }
    ];
export const DIR_ADMON_FINANZAS_C: FuseNavigationItem[] = [];
export const DIR_ADMON_FINANZAS_F: FuseNavigationItem[] = [];
export const DIR_ADMON_FINANZAS_H: FuseNavigationItem[] = [];
